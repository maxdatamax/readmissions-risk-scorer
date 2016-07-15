# readmissions-risk-scorer
This is a temporary repo for the Intel-TAP readmission risk scoring model reference architecture

This intent is for this repo to be a one-stop source for everything you need to take your own hispital patient data, load that data into TAP, extract and process the relevant features, and train a model to preidct which patients are likely to be readmitted withing some amount of time.

This tutorial takes as given that you have access to a running TAP VPC (version 0.7), have access to patient data in CSV format, have permissions to upload data to the HDFS data catalog, and can create Jupyter notebook instances.

## Overview
1. First, we will cover how to upload patient data to the Data Catalog.
2. Second, we will demonstrate how to create a Jupyter notebook running Pyspark and load the patient data for analysis.
3. Next, we will select a classifier model to identify patients at risk of readmission.
4. Then, we will discuss how to tune model parameters, evaluate the models performance, and disucuss common risks and 'gotchas' to be aware of when modeling.
5. Finally, we will show how to deploy the model as a REST api so that medical staff can begin identifying which patients are most at risk of readmission.

## 1. Loading the data into the Data Catalog

1. First, log in to the console for your TAP VPC. It should look something like this:

![Data Catalog](/data-catalog.png)

2. To load your data, select the "Submit Transfer" tab. You upload datafiles directly from your local machine or you can pass a link. You can also `<ssh>' or '<sftp>' into '<cdh-launcher>' from you can directly interact with the nodes of the Hadoop cluster via the hdfs command (e.g. PUT files directly into HDFS).  

For this exercise, I am using the MIMIC-III dataset, which can be accessed at: https://mimic.physionet.org/

In this case, the data we are using are called ADMISSIONS.csv, PATIENTS.csv, and DRGCODES.csv. If you are using your own organization's data, I have provided a brief description of the above files and why we want it, so you can find the analogous tables in your own organization.

a. ADMISSIONS.csv - contains the unique patient id ('SUBJECT_ID'), unique admission id ('HADM_ID'), the type of admissions (e.g. 'EMERGENCY', 'ELECTIVE', 'NEWBORN' etc.), time of patient admission ('ADMITTIME'), time of patient discharge ('DISCHTIME') and some socioeconomic and demographic features like 'ETHNICITY', 'LANGUAGE', 'INSURANCE', and
'ADMIT_TYPE', etc.

b. PATIENTS.csv - contains features like the patient's id ('SUBJECT_ID'), gender ('GENDER'), date of birth ('DOB') frmo which we can derive the patients age at a given hospital admission.

c. DRGCODES.csv - contains the cormorbidity features 'DRG_MORTALITY' and 'DRG_SEVERITY'. These are data that essentially represent how severe, complicated, and dangerous a patients condition is. 

**Note**: We also have access to a rich set of electronic chart data that contains entries for daily blood pressure, heartrate, various types of urinalysis data, and thousands of other medical results and biomarker data. I have deliberately not included this data for the reason that for any given type of entry on the electronic record only a subset of the patients have that specific type of data record. For example, there are over 40,000 unique patients over nearly 59,000 unique admissions. If I want to train a model that uses features such as heartrate, bodyweight, and bloodpressure data, I need to find the set of patients such that most of the patients have that heartrate AND bodyweight AND bloodpressure data. As you add more features, the set of patients that have all of those features quickly becomes smaller and smaller. There are many ways you can address this shortcomming such as imputation of missing values, or only selecting chart data that nearly all the patients have in their record. I chose to use comorbidity info (contained in DRGCODES.csv) because it can be thought of as a lower dimensional representation of the many different biomarkers that come along with a given diagnosis


