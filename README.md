# readmissions-risk-scorer
This is a temporary repo for the Intel-TAP readmission risk scoring model reference architecture

# Executive Summary

## 1. The Problem

The Affordable Care Act established the Hospital Readmissions Reduction Program (HRRP), which requires the Centers for Medicare & Medicaid Services (CMS) to promote quality health care for Americans. To this end the CMS is required to reduce payments to hospitals with excessive readmissions. Additionally, hospitals incur unnecessary costs when patients are readmitted for conditions that could have been addressed or mitigated during the patient's initial admission. As a result, hospitals are seeking ways to reduce readmission rates.

## 2. Solution Summary

The availability of large patient datasets and the computational resources available via cloud computing enable data scientists to find meaningful patterns in patient readmission data. From these patterns, models can be built which enable hospitals to identify the most at-risk patients before they are discharged and apply an appropriate intervention.  

Intel's Trusted Analytics Platform (TAP) uses industry standard Open Source tools (e.g. Cloudera Hadoop, Docker, and CloudFoundry) to create a consolidated platform to quickly develop predictive models from large datasets and then deploy those models for use in applications.

![Predictive Modeling Process](images/predictive-modeling-process.png)

The above diagram demonstrates the general process by which patient Electronic Medical Records (EMR) data can be combined with multiple data sources, such as census data, and socio-economic data to form a rich picture about patients. With a dataset on hand, data scientists can create predictive models that learn the relationships between patient data and their propensity for different conditions, e.g. heart disease or risk of early readmission.

## 3. How to Use the Solution

Once a predictive model has been created and validated, it can be deployed as a cloud-based service that allows the model's predictions to be consumed by other applications. For example, discharge planning software can pass a list of patient IDs to the model and receive a score that indicates the readmission risk for each patient. Once high-risk patients have been identified, their EMRs and discharge plans can be scrutinized to identify any risk factors that have been identified.

In this way, the model serves as a cognitive aid to assist hospital staff in identifying high-risk people who may have gone unnoticed.

## 4. What Does the Solution Contain

At it's core, TAP consists of three key open source technologies:

  1. **Cloudera Hadoop (CDH)**
  2. **Docker**
  3. **CloudFoundry**

This solution utilizes the above components by storing historical data and patient records in the CDH cluster. Data Scientists are able to analyze the data via the creation of Docker containers that contained virtual instances of Jupyter analytics notebooks, to enable collaborative and reproducible work. Additionally, Apache Spark -- the big data computing engine -- was utilized on the CDH cluster to analyze the datasets that were too big to fit into the memory. Spark was also used to train and validate the machine learning model for making predictions of high-risk patients. Finally, the trained model was packaged into an application and deployed in the TAP cloud as a CloudFoundry application.

## 5. Solution Background

This solution originated through Intel's partnership with Cloudera to conduct a pilot program with a Large Hospital Group to use predictive analytics to reduce readmission rates. 

Intel Data Scientists combined the hospital historical patient data with socioeconomic data, such as housing prices and health services in the surrounding area, to train a Random Forest predictive model that enabled doctors to pinpoint which patients were a high readmission risk. Hospital staff were able to administer additional care to identify any shortcomings in the treatment and discharge plan, thereby reducing overall readmission rates.

By Using the predictions from the analysis, the Hospital Group was able to reap the following benefits:

  1. **Reducing 6,000 occurrences of patient readmission.**
  2. **Avoiding $4 million in potential Medicare penalties.**
  3. **Saving approximately $72 million in medical costs.**
  4. **Improving hospital ratings by lowering readmission rate and increasing patient satisfaction.**
  5. **More efficient utilization of resources by focusing at high-risk patients.**

One of the unintended benefits of implementing this solution was more efficient utilization of resources. Specifically, the increased quality of care provided to the identified high-risk patients during their initial visit freed up resources that enabled the Hospital Group to help an additional 300 - 500% more patients.

We have provided a blueprint that enables any hospital organization to use TAP, adopt the above described solution, and begin reaping the same benefits.

## 6. Adoption Roadmap

This adoption roadmap for this solution consists of five essential steps:

1. **Identifying and loading the relevant data into the TAP cluster.**
2. **Explore, process, and engineer features for use in predictive modeling.**
3. **Pick a performance criteria and train a predictive model accordingly.**
4. **Deploy the predictive model as an API that can be used by another application.**
5. **Build an application that flags high-risk patients and allows practitioners to visualize relevant patient data.**

![Solution Architecture](images/architecture-diagram-1.png)

1. **Identifying and loading the relevant data into the TAP cluster.** At a minimum, the hospitals admission records are required to identify which patients were readmitted within a given time frame. Other sources of data, such as demographic information and comorbidity records, can enrich the patient readmission data, boosting model performance. Choosing which data to incorporate in a model can be as much a creative effort as it is an investigative one, and should be treated as an iterative development process. Subject Matter Experts (SMEs), IT professionals, and Data Scientists should be involved in this initial phase. Data can be loaded and stored in TAP in many forms that lend themselves to the individual preferences and needs of an IT and Analytics team. 

2. **Explore, process, and engineer features for use in predictive modeling.** This step involves creating the data pipeline that takes the data from the source defined in the previous step and prepares it for modeling. These steps will include initial Exploratory Data Analysis (EDA) to learn the structure of the data, determine if there are any dirty or missing data, how to clean and impute missing fields, and finally identify which data fields will be useful for modeling. A significant effort in this step is feature engineering, that is, the creation of new data features from pre-existing ones. Feature Engineering is another opportunity for SMEs, IT professionals, and data scientists to come together to brainstorm and discuss novel ideas and courses of action.

3. **Pick a performance criteria and train a predictive model accordingly.** This step entails considering the practical details of what a model is doing. No model is perfect and this fact requires that tradeoffs must be made since some patients will be incorrectly flagged by the model and other high-risk patients will be missed entirely. This requires that an analysis e done that considers the cost of false positives and false negatives – wasted time, unnecessary medical care, missing a high-risk patient – and the benefit of true positives – reducing readmissions. The stakeholders in this discussion are the healthcare professionals, operations planning staff, and data scientists. With appropriate performance criteria the data scientist can train and validate a model according to the specified criteria.

4. **Deploy the predictive model as an API that can be used by another application.** Once a model has been created it must be deployed in a format that enables other applications to consume the predictions it makes. From a development and integration standpoint the simplest way to do this is package the model as a service where it can be called like a REST API. This allows developers to only worry about the input and output of the model and ignore the internal details of how the model works.

5. **Build an application that flags high-risk patients and allows practitioners to visualize relevant patient data.** With the model available as a service, we need to give medical practitioners a way to utilize the model's predictions. Since the output of a model is just a number representing a risk score for readmission, it is helpful to provide contextual data to go with a given prediction, e.g. patient's weight, age, comorbidity scores, and socioeconomic data. With this supplemental data, hospital staff can view the model's prediction within the broader context of the overall population and use that data to augment their reasoning.



## Overview

This intent is for this repo to be a one-stop source for everything you need to take your own hospital patient data, load that data into TAP, extract and process the relevant features, and train a model to predict which patients are likely to be readmitted within some amount of time.

This tutorial takes as given that you have access to a running TAP VPC (version 0.7), have access to patient data in CSV format, have permissions to upload data to the HDFS data catalog, and can create Jupyter notebook instances.

Additionally, there are several assumptions about skills and familiarity with technology, specifically:
  * You are familiar with iPython or Jupyter notebooks.
  * You are familiar with Spark
  * You can write SQL queries

1. First, we will cover how to upload patient data to the Data Catalog.
2. Second, we will demonstrate how to create a Jupyter notebook running Pyspark and load the patient data for analysis.
3. Next, we will select a classifier model to identify patients at risk of readmission.
4. Then, we will discuss how to tune model parameters, evaluate the model's performance, and discuss common risks and 'gotchas' to be aware of when modeling.
5. Finally, we will show how to deploy the model as a REST api so that medical staff can begin identifying which patients are most at risk of readmission.         

# 1. Loading the data into the Data Catalog

* First, log in to the console for your TAP VPC. It should look something like this:

![Data Catalog](images/data-catalog.png)

* To load your data, select the "Submit Transfer" tab. You upload data files directly from your local machine or you can pass a link. You can also `ssh` or `sftp` into `cdh-launcher` and from there you can directly interact with the nodes of the Hadoop cluster via the hdfs command (e.g. PUT files directly into HDFS). For our purposes, uploading data to the Data Catalog with the browser based console is probably the quickest and easiest way.

For this exercise, I am using the MIMIC-III dataset, which can be accessed at: https://mimic.physionet.org/

In this case, the data we are using are called `ADMISSIONS.csv`, `PATIENTS.csv`, and `DRGCODES.csv`. If you are using your own organization's data, I have provided a brief description of the above files and why we want to use them. You can find the analogous tables in your own organization.

a. `ADMISSIONS.csv` - contains the unique patient id (`SUBJECT_ID`), unique admission id (`HADM_ID`), the type of admissions (e.g. `EMERGENCY`, `ELECTIVE`, `NEWBORN` etc.), time of patient admission (`ADMITTIME`), time of patient discharge (`DISCHTIME`) and some socioeconomic and demographic features like `ETHNICITY`, `LANGUAGE`, `INSURANCE`, and
`ADMIT_TYPE`, etc.

b. `PATIENTS.csv` - contains features like the patient's id (`SUBJECT_ID`), gender (`GENDER`), date of birth (`DOB`) from which we can derive the patient's age at a given hospital admission.

c. `DRGCODES.csv` - contains the comorbidity features `DRG_MORTALITY` and `DRG_SEVERITY`. These are data that essentially represent how severe, complicated, and dangerous a patient's condition is. 

(Move to footnote)**Note**: We also have access to a rich set of electronic chart data that contains entries for daily blood pressure, heart rate, various types of urinalysis data, and thousands of other medical results and biomarker data. I have deliberately not included this data for the reason that for any given type of entry on the electronic record only a subset of the patients have that specific type of data record. For example, there are over 40,000 unique patients comprising nearly 59,000 unique admissions. If I want to train a model that uses features such as heart rate, body weight, and blood pressure data, I need to find the set of patients such that most of the patients have that heart rate AND body weight AND blood pressure data. As you add more features, the set of patients that have all of those features quickly becomes smaller and smaller. There are many ways you can address this shortcoming such as imputation of missing values, or only selecting chart data that nearly all the patients have in their record. I chose to use comorbidity info (contained in `DRGCODES.csv`) because it can be thought of as a lower dimensional representation of the many different biomarkers that come along with a given diagnosis.

* Name the files whatever you want to call them and give them any appropriate labels, e.g. Healthcare.

* Click "Upload" and wait. 

* You will have to do steps 3. and 4. for each file you want to upload to the Data Catalog.

# 2. Create a Jupyter (iPython) notebook and load data into Spark 

* Click on the "Data Science" tab on the right side of the console Dash Board. Click on the "Jupyter" tab.

![Creating a Jupyter Notebook](images/jupyter.png)

* Give your notebook a name and click on the "Create New Instance" button. It can take a few seconds while the Docker host spins up a container running your Jupyter notebook.

* TAP uses the standard Anaconda distribution for iPython, but you can click on the "Help" tab to verify that your battle tested scientific toolkit (e.g. `pandas`, `numpy`, `scipy`, `sklearn`, `matplotlib` etc.) is available and ready to use.

![A Brand New Jupyter Notebook](images/ipython.png)

* *Note:* If there is a package that you want to use that is not available just run `!pip install myPackage`.

* Start by making some standard `pyspark` imports:
```python
from pyspark import SparkContext, SparkConf
from pyspark.sql import SQLContext
```

* Since we are working with csv files the `spark-csv` package is extremely useful ([spark-csv docs here](https://github.com/databricks/spark-csv)). Specifically, it allows us to read csv files directly into DataFrames and enables labor saving features like automatically inferring schema. The default version of Spark for TAP 0.7 is Spark 1.5.0 which does not have spark-csv as part of the standard toolkit, so it must be passed using the `--packages` parameter of `spark-submit`:

```python
import os

os.environ['PYSPARK_SUBMIT_ARGS'] = "--deploy-mode client \
                                     --packages com.databricks:spark-csv_2.10:1.4.0 \
                                     --driver-memory 2G \
                                     --num-executors 4 \
                                     --executor-memory 8G\
                                     pyspark-shell"
```
Notice that we also explicitly pass the `client` for the `--deploy-mode` argument. This will allow us to use spark in the cell based REPL workflow that makes Jupyter notebooks so useful for data analysis.

**Note:** For exploratory data analysis and investigating a dataset I prefer to use `spark-submit` to set the parameters for the SparkContext. You can also edit the `spark-defaults.conf` to edit the defaults, adjusting parameters like `--num-executors`, `--driver-memory`, `--executor-memory`, and `--num-executors`, etc. However, `spark-submit` has the benefit that the arguments you pass override whatever their corresponding value is in `spark-defaults.conf`. The `SparkConf` object also gives you a great deal of control over the specific resources and properties your Spark application has. You can read more [here](http://spark.apache.org/docs/latest/submitting-applications.html).  

* Let's create the `SparkContext` and the `SQLContext`. `SQLContext` allows us to create Spark DataFrames, enabling us to use SQL queries against our dataframes. DataFrames also allow us to use `pandas` style dataframe operations when it is more appropriate. Additionally, you can use `map`, `filter`, `reduceByKey`, `flatMap`, etc. on dataframes, just like you can with RDDs. 

```python
sc = SparkContext()
sqlContext = SQLContext(sc)
# Tungsten is the built-in code execution optimizer. It should be on by default, but make sure it is on.
sqlContext.setConf("spark.sql.tungsten.enabled", "true")
```
* In order to load our `CSV` files, we need the HDFS uris for our files from the Data Catalog. Click on the **Data Catalog** tab of the TAP Console and ensure you are viewing the **Data sets** subtab. From here, click on the filename of the `CSV` files you want to load into Spark. Once you click on the filename, you should see a **targetUri** that is very long and looks something like this: 

![Finding file URIs in the Data Catalog](images/hdfs-uri.png)

* The below URIs are palacehodlers. Copy and paste the **targetUri** for each file in the **Data Catalog** that you want to load:
```python
hdfsPathAdmissions = "hdfs://nameservice1/org/1fc35ebe-d845-45e3-a2b1-b3effe9483e2/brokers/userspace/9e6d3f28-a119-43d9-ad67-fdbe4860be98/9997ff80-b53f-46c4-9dca-f76cc56c876a/000000_1"
hdfsPathPatients = "hdfs://nameservice1/org/1fc35ebe-d845-45e3-a2b1-b3effe9483e2/brokers/userspace/9e6d3f28-a119-43d9-ad67-fdbe4860be98/d82b3a1e-de79-4312-98be-1499e25e25c6/000000_1"
hdfsPathCodes = "hdfs://nameservice1/org/1fc35ebe-d845-45e3-a2b1-b3effe9483e2/brokers/userspace/9e6d3f28-a119-43d9-ad67-fdbe4860be98/e69a6c0a-5507-4cec-a184-c2a480ee2a6a/000000_1"
```
* Use `spark-csv` to load the `CSV` files into Spark DataFrames:
```python
df_admissions = sqlContext.read.format('com.databricks.spark.csv').\
                                options(header='true', inferSchema=True).\
                                load(hdfsPathAdmissions)

df_patients = sqlContext.read.format('com.databricks.spark.csv').\
                                options(header='true', inferSchema=True).\
                                load(hdfsPathPatients)

df_drgcodes = sqlContext.read.format('com.databricks.spark.csv').\
                                options(header='true', inferSchema=True).\
                                load(hdfsPathCodes)
```
* Check the schema to make sure that data types and column names are what you want:
```python
df_admissions.printSchema()

root
 |- ROW_ID: integer (nullable = true)
 |- SUBJECT_ID: integer (nullable = true)
 |- HADM_ID: integer (nullable = true)
 |- ADMITTIME: timestamp (nullable = true)
 |- DISCHTIME: timestamp (nullable = true)
 |- DEATHTIME: timestamp (nullable = true)
 |- ADMISSION_TYPE: string (nullable = true)
 |- ADMISSION_LOCATION: string (nullable = true)
 |- DISCHARGE_LOCATION: string (nullable = true)
 |- INSURANCE: string (nullable = true)
 |- LANGUAGE: string (nullable = true)
 |- RELIGION: string (nullable = true)
 |- MARITAL_STATUS: string (nullable = true)
 |- ETHNICITY: string (nullable = true)
 |- EDREGTIME: timestamp (nullable = true)
 |- EDOUTTIME: timestamp (nullable = true)
 |- DIAGNOSIS: string (nullable = true)
 |- HOSPITAL_EXPIRE_FLAG: integer (nullable = true)
 |- HAS_IOEVENTS_DATA: integer (nullable = true)
 |- HAS_CHARTEVENTS_DATA: integer (nullable = true)
```
**Note:** If the schema is not what you want, you can always pass an explicit schema, instead of using the inferschema option ([creating a schema](http://spark.apache.org/docs/latest/sql-programming-guide.html#programmatically-specifying-the-schema)).
Another option is to create new columns of the right type that are derived from the columns that were incorrectly cast. It is important to keep in mind that Spark dataframes and RDDs are immutable objects, so you cannot cast an existing object to a different type, you have to create an entire new column with a different name.

Let's check to see what the `ADMISSIONS` data looks like:
```python
df_patients.show(5)
"""
+------+----------+------+--------------------+--------------------+--------+--------------------+-----------+
|ROW_ID|SUBJECT_ID|GENDER|                 DOB|                 DOD|DOD_HOSP|             DOD_SSN|EXPIRE_FLAG|
+------+----------+------+--------------------+--------------------+--------+--------------------+-----------+
|   612|       646|     M|2128-01-05 00:00:...|                null|    null|                null|          0|
|   613|       647|     M|2106-03-24 00:00:...|                null|    null|                null|          0|
|   614|       648|     M|2139-07-13 00:00:...|                null|    null|                null|          0|
|   615|       649|     M|2177-06-23 00:00:...|                null|    null|                null|          0|
|   616|       650|     M|2051-04-15 00:00:...|2111-12-28 00:00:...|    null|2111-12-28 00:00:...|          1|
+------+----------+------+--------------------+--------------------+--------+--------------------+-----------+
only showing top 5 rows
"""
```

We can register our `ADMISSIONS` dataframe as the table `admissions` -- enabling us to query it with SQL:
```python
sqlContext.registerDataFrameAsTable(df_admissions, "admissions")
threeRows = sqlContext.sql("SELECT * FROM admissions LIMIT 3")
threeRows.show()

"""
+------+----------+-------+--------------------+--------------------+---------+--------------+--------------------+-------------------+---------+--------+------------+--------------+--------------------+--------------------+--------------------+--------------------+--------------------+-----------------+--------------------+
|ROW_ID|SUBJECT_ID|HADM_ID|           ADMITTIME|           DISCHTIME|DEATHTIME|ADMISSION_TYPE|  ADMISSION_LOCATION| DISCHARGE_LOCATION|INSURANCE|LANGUAGE|    RELIGION|MARITAL_STATUS|           ETHNICITY|           EDREGTIME|           EDOUTTIME|           DIAGNOSIS|HOSPITAL_EXPIRE_FLAG|HAS_IOEVENTS_DATA|HAS_CHARTEVENTS_DATA|
+------+----------+-------+--------------------+--------------------+---------+--------------+--------------------+-------------------+---------+--------+------------+--------------+--------------------+--------------------+--------------------+--------------------+--------------------+-----------------+--------------------+
|    90|        87| 190659|2191-02-25 20:30:...|2191-04-25 15:18:...|     null|       NEWBORN|PHYS REFERRAL/NOR...|SHORT TERM HOSPITAL|  Private|        |UNOBTAINABLE|              |UNKNOWN/NOT SPECI...|                null|                null|             NEWBORN|                   0|                1|                   1|
|    91|        88| 123010|2111-08-29 03:03:...|2111-09-03 14:24:...|     null|     EMERGENCY|EMERGENCY ROOM ADMIT|               HOME|  Private|        |            |              |BLACK/AFRICAN AME...|2111-08-29 01:44:...|2111-08-29 02:28:...|S/P MOTOR VEHICLE...|                   0|                1|                   1|
|    92|        89| 188646|2185-06-17 05:22:...|2185-06-21 11:15:...|     null|       NEWBORN|PHYS REFERRAL/NOR...|SHORT TERM HOSPITAL| Medicaid|        |UNOBTAINABLE|              |UNKNOWN/NOT SPECI...|                null|                null|             NEWBORN|                   0|                1|                   1|
+------+----------+-------+--------------------+--------------------+---------+--------------+--------------------+-------------------+---------+--------+------------+--------------+--------------------+--------------------+--------------------+--------------------+--------------------+-----------------+--------------------+
"""
```
* We have now loaded the data that we intend to work with. In the next section we will begin processing in preparation for modeling.

# 3. Data Processing

* Looking at our admission table, we know that there is unique entry for each hospital admission. In this table the unique `SUBJECT_ID` can show up multiple times -- corresponding to distinct hospital admissions (`HADM_ID`).

Let's find the number of admissions for each patient.
```python
q1 = """SELECT SUBJECT_ID, COUNT(*) AS NUM_ADMISSIONS 
        FROM admissions 
        GROUP BY SUBJECT_ID"""
```
* We can create a new DataFrame `admissionCounts` that is the result of running the above SQL query. Notice, that nothing happens because we have not yet asked Spark to perform any action. We are merely describing a set of transformations that Spark will perform once we actually take an action and ask for a result.
```python
admissionCounts = sqlContext.sql(q1)
admissionCounts.show(7)

"""
+----------+--------------+
|SUBJECT_ID|NUM_ADMISSIONS|
+----------+--------------+
|        31|             1|
|       231|             2|
|       631|             2|
|       431|             1|
|      1031|             1|
|       831|             1|
|      1431|             1|
+----------+--------------+
only showing top 7 rows
"""
```
* Here I register a new table 'admissionCounts' to keep things simple. SQL subqueries do not always work in SparkSQL, so registering a DataFrame as a table or aliasing is often both easier and the only way to actually subselect in SparkSQL. Also, the "tables" do not occupy any additional memory since they are not created until an action is taken that requires the data.
```python
sqlContext.registerDataFrameAsTable(admissionCounts, "admissioncounts")
```
* Let's focus on identifying the patients that were readmitted.
```python
q2 = """SELECT a.ROW_ID, a.SUBJECT_ID, a.HADM_ID, a.ADMITTIME, a.DISCHTIME, b.NUM_ADMISSIONS
        FROM admissions AS a, admissioncounts AS b  
        WHERE a.SUBJECT_ID = b.SUBJECT_ID AND b.NUM_ADMISSIONS > 1
        ORDER BY ADMITTIME ASC"""

readmittedPatients = sqlContext.sql(q2)
sqlContext.registerDataFrameAsTable(readmittedPatients, "readmitted_patients")
readmittedPatients.show(5)

"""
+------+----------+-------+--------------------+--------------------+--------------+
|ROW_ID|SUBJECT_ID|HADM_ID|           ADMITTIME|           DISCHTIME|NUM_ADMISSIONS|
+------+----------+-------+--------------------+--------------------+--------------+
| 25576|     20957| 113808|2100-06-24 22:37:...|2100-07-03 12:31:...|             4|
|  5463|      4521| 167070|2100-06-28 19:29:...|2100-07-30 11:02:...|             3|
| 11401|      9319| 137275|2100-07-01 12:00:...|2100-07-15 16:30:...|             2|
| 38375|     31585| 125380|2100-07-02 19:28:...|2100-07-07 18:05:...|             3|
| 15739|     12834| 107726|2100-07-14 20:52:...|2100-07-22 17:06:...|             2|
+------+----------+-------+--------------------+--------------------+--------------+
only showing top 5 rows
"""
```
* With the subset of patients who have been admitted more than once we now join each patient's hospital admission data to the hospital admission data immediately proceding it. 
```python
q3 = """SELECT
            a.ROW_ID,
            a.SUBJECT_ID,
            b.HADM_ID as DISCH_HADM_ID,
            a.HADM_ID as ADMIT_HADM_ID,
            b.DISCHTIME as DISCHARGETIME,
            a.ADMITTIME as READMITTIME,
            a.NUM_ADMISSIONS
        FROM readmitted_patients a 
        INNER JOIN readmitted_patients b ON a.ROW_ID = b.ROW_ID + 1 
        WHERE a.SUBJECT_ID = b.SUBJECT_ID"""

timeShiftedRows = sqlContext.sql(q3)
timeShiftedRows.show(5)

"""
+------+------+----------+----------+-------------+-------------+--------------------+--------------------+--------------+
|ROW_ID|ROW_ID|SUBJECT_ID|SUBJECT_ID|DISCH_HADM_ID|ADMIT_HADM_ID|       DISCHARGETIME|         READMITTIME|NUM_ADMISSIONS|
+------+------+----------+----------+-------------+-------------+--------------------+--------------------+--------------+
|    68|    67|        67|        67|       186474|       155252|2155-03-06 15:00:...|2157-12-02 00:45:...|             2|
|  1335|  1334|      1076|      1076|       144044|       170098|2173-12-13 15:15:...|2175-11-10 23:19:...|             3|
|  2467|  2466|      2040|      2040|       124831|       125913|2145-12-13 18:09:...|2146-07-10 20:58:...|             3|
|  2742|  2741|      2265|      2265|       147742|       100548|2125-10-26 13:28:...|2125-10-31 19:35:...|             5|
|  3965|  3964|      3286|      3286|       133404|       136308|2189-12-25 13:02:...|2191-06-14 05:14:...|             2|
+------+------+----------+----------+-------------+-------------+--------------------+--------------------+--------------+
only showing top 5 rows
"""
```
* From here we can use the datefiff function to find the number of days between the `DISCHTIME` of one admission and the `ADMITTIME` of the next admission for each patient that was discharged and later readmitted.  
```python
from pyspark.sql.functions import datediff

df2 = timeShiftedRows.withColumn('DAYS_UNTIL_READMISSION', datediff(timeShiftedRows.READMITTIME, timeShiftedRows.DISCHARGETIME))
df2.show(5)

"""
+------+------+----------+----------+-------------+-------------+--------------------+--------------------+--------------+----------------------+
|ROW_ID|ROW_ID|SUBJECT_ID|SUBJECT_ID|DISCH_HADM_ID|ADMIT_HADM_ID|       DISCHARGETIME|         READMITTIME|NUM_ADMISSIONS|DAYS_UNTIL_READMISSION|
+------+------+----------+----------+-------------+-------------+--------------------+--------------------+--------------+----------------------+
|    68|    67|        67|        67|       186474|       155252|2155-03-06 15:00:...|2157-12-02 00:45:...|             2|                  1002|
|  1335|  1334|      1076|      1076|       144044|       170098|2173-12-13 15:15:...|2175-11-10 23:19:...|             3|                   697|
|  2467|  2466|      2040|      2040|       124831|       125913|2145-12-13 18:09:...|2146-07-10 20:58:...|             3|                   209|
|  2742|  2741|      2265|      2265|       147742|       100548|2125-10-26 13:28:...|2125-10-31 19:35:...|             5|                     5|
|  3965|  3964|      3286|      3286|       133404|       136308|2189-12-25 13:02:...|2191-06-14 05:14:...|             2|                   536|
+------+------+----------+----------+-------------+-------------+--------------------+--------------------+--------------+----------------------+
only showing top 5 rows
"""

sqlContext.registerDataFrameAsTable(df2, "target")
```
* This query explicitly excludes anyone who dies in the hospital -- about 7000 people, in this dataset. It may be the case that you want to include people who die. We also only include people who have chartevents data because we may end up using that data later.
```python
q4 = """SELECT 
            a.SUBJECT_ID, 
            a.HADM_ID,
            a.ADMITTIME,
            a.ADMISSION_TYPE, 
            a.ETHNICITY,
            IF (a.MARITAL_STATUS IS NULL, 'UNKNOWN', a.MARITAL_STATUS) as MARITAL_STATUS,
            a.INSURANCE,
            a.LANGUAGE,
            NUM_ADMISSIONS,
            IF (t.DAYS_UNTIL_READMISSION IS NULL, 0, t.DAYS_UNTIL_READMISSION) as DAYS_TO_READMISSION
        FROM admissions a 
        LEFT JOIN target t ON a.HADM_ID = t.DISCH_HADM_ID 
        WHERE a.HAS_CHARTEVENTS_DATA = 1 AND a.HOSPITAL_EXPIRE_FLAG = 0"""
        
admissionsTarget = sqlContext.sql(q4)
admissionsTarget.show(5)

"""
+----------+-------+--------------------+--------------+--------------------+--------------+---------+--------+--------------+-------------------+
|SUBJECT_ID|HADM_ID|           ADMITTIME|ADMISSION_TYPE|           ETHNICITY|MARITAL_STATUS|INSURANCE|LANGUAGE|NUM_ADMISSIONS|DAYS_TO_READMISSION|
+----------+-------+--------------------+--------------+--------------------+--------------+---------+--------+--------------+-------------------+
|      6892| 100031|2140-11-11 07:15:...|      ELECTIVE|               WHITE|       MARRIED| Medicare|        |             2|                688|
|     28965| 100431|2149-10-09 15:27:...|     EMERGENCY|BLACK/AFRICAN AME...|       WIDOWED| Medicare|    ENGL|          null|                  0|
|     18376| 100831|2147-06-12 14:29:...|     EMERGENCY|               ASIAN|       MARRIED| Medicare|    ENGL|             4|                379|
|      3478| 101031|2156-03-17 06:43:...|       NEWBORN|               WHITE|              |  Private|        |          null|                  0|
|     73713| 101431|2146-09-19 16:42:...|     EMERGENCY|               WHITE|       MARRIED|  Private|    ENGL|            17|                 66|
+----------+-------+--------------------+--------------+--------------------+--------------+---------+--------+--------------+-------------------+
only showing top 5 rows
"""

sqlContext.registerDataFrameAsTable(admissionsTarget, "admissions_target")
sqlContext.sql("select COUNT(*) as num_patients from admissions_target").show()

"""
+------------+
|num_patients|
+------------+
|       51558|
+------------+
"""
```
* Now, we will extract the patient's gender and age from the `PATIENTS` table -- excluding the patients who died during their stay.
```python
sqlContext.registerDataFrameAsTable(df_patients, "patients")

q5 = """SELECT 
            a.*,
            p.GENDER, 
            p.DOB
        FROM admissions_target a
        LEFT JOIN patients p ON a.SUBJECT_ID = p.SUBJECT_ID
        WHERE p.EXPIRE_FLAG = 0"""

patients = sqlContext.sql(q5)
```
* Let's calculate the patient's age, I rounded the age to 1 decimal place to account for any a more granular representation of the qualitative differences in health that may exist between between really young children (i.e. < 3 months) and slightly older -- but perhaps more healthy -- young children (i.e. 6-12 months).
```python
from pyspark.sql.functions import datediff, round as Round

df3 = patients.withColumn('AGE', Round(datediff(patients.ADMITTIME, patients.DOB)/365, 1))
sqlContext.registerDataFrameAsTable(df3, "patients_with_target")
```
* Extract some useful info from the comorbidity scores.
```python
sqlContext.registerDataFrameAsTable(df_drgcodes, "drg_codes")

q6 = """SELECT 
           HADM_ID, 
           IF (AVG(DRG_SEVERITY) IS NULL, 0, AVG(DRG_SEVERITY)) as AVG_DRG_SEVERITY,
           IF (AVG(DRG_MORTALITY) IS NULL, 0, AVG(DRG_SEVERITY)) as AVG_DRG_MORTALITY
        FROM drg_codes 
        GROUP BY HADM_ID"""

ccInfo = sqlContext.sql(q6)
sqlContext.registerDataFrameAsTable(ccInfo, "cc_info")
```
* Join the comorbidity scores to the admission data to create a working dataset ready for cleaning.
```python
q7 = """SELECT
            p.ADMISSION_TYPE, 
            p.ETHNICITY,
            p.INSURANCE,
            p.LANGUAGE,
            p.MARITAL_STATUS,
            p.GENDER,
            p.AGE,
            c.AVG_DRG_SEVERITY,
            c.AVG_DRG_MORTALITY,
            p.DAYS_TO_READMISSION
        FROM patients_with_target p
        LEFT JOIN cc_info c ON p.HADM_ID = c.HADM_ID
"""

workingData = sqlContext.sql(q7)
sqlContext.registerDataFrameAsTable(workingData, "working_data")
```
#4 Preparing Features for Modeling

*Consolidate ETHNICITY, LANGUAGE, and MARITAL_STATUS labels and select the columns that we want to use for modeling.
```python
q8 = """
    SELECT 
        ADMISSION_TYPE,
        INSURANCE,
        GENDER,
        IF (AGE > 200, 91, AGE) as AGE,
        AVG_DRG_SEVERITY,
        AVG_DRG_MORTALITY,
        CASE
            WHEN ETHNICITY LIKE 'WHITE%' OR 
                 ETHNICITY LIKE 'EUROPEAN%' OR
                 ETHNICITY LIKE 'PORTUGUESE%' THEN 'white/european'
            WHEN ETHNICITY LIKE 'BLACK%' OR 
                 ETHNICITY LIKE 'AFRICAN%' THEN 'black/african'
            WHEN ETHNICITY LIKE 'HISPANIC%' OR 
                 ETHNICITY LIKE 'LATINO%' THEN 'hispanic/latino'
            WHEN ETHNICITY LIKE '%MIDDLE EASTERN%' THEN 'mideastern'
            WHEN ETHNICITY LIKE 'ASIAN%' OR
                 ETHNICITY LIKE '%ASIAN - INDIAN%' THEN 'asian/indian'
            ELSE 'other' 
            END as ETHN,
        CASE 
          WHEN ADMISSION_TYPE='NEWBORN' THEN 'newborn'
          WHEN LANGUAGE='ENGL' THEN 'english'
          WHEN LANGUAGE='' THEN 'unknown'
          ELSE 'other'
          END as LANG,
        CASE
          WHEN MARITAL_STATUS LIKE 'NEWBORN' THEN 'MARITAL-NEWBORN'
          WHEN MARITAL_STATUS LIKE '' OR MARITAL_STATUS LIKE 'LIFE PARTNER' THEN 'MARITAL-OTHER'
          WHEN MARITAL_STATUS LIKE 'UNKNOWN%' THEN 'MARITAL-UNKNOWN'
          ELSE MARITAL_STATUS
          END as STATUS,
        DAYS_TO_READMISSION
    FROM working_data
"""

data = sqlContext.sql(q8)
data.show(10)

"""
+--------------+---------+------+----+----------------+-----------------+--------------+-------+-------------+-------------------+
|ADMISSION_TYPE|INSURANCE|GENDER| AGE|AVG_DRG_SEVERITY|AVG_DRG_MORTALITY|          ETHN|   LANG|       STATUS|DAYS_TO_READMISSION|
+--------------+---------+------+----+----------------+-----------------+--------------+-------+-------------+-------------------+
|     EMERGENCY| Medicare|     F|76.3|             2.0|              2.0| black/african|english|      WIDOWED|                  0|
|       NEWBORN|  Private|     M| 0.0|             0.0|              0.0|white/european|newborn|MARITAL-OTHER|                  0|
|     EMERGENCY|  Private|     F|49.9|             3.0|              3.0|white/european|english|      MARRIED|                 66|
|      ELECTIVE| Medicare|     F|72.6|             0.0|              0.0|         other|unknown|      MARRIED|                  0|
|      ELECTIVE|  Private|     F|59.5|             2.0|              2.0| black/african|english|       SINGLE|                  0|
|       NEWBORN|  Private|     M| 0.0|             1.0|              1.0|         other|newborn|MARITAL-OTHER|                  0|
|     EMERGENCY| Medicare|     M|73.2|             3.0|              3.0|  asian/indian|  other|      WIDOWED|                  0|
|     EMERGENCY| Medicaid|     M|19.1|             4.0|              4.0|white/european|english|MARITAL-OTHER|                  0|
|     EMERGENCY|  Private|     M|24.7|             0.0|              0.0|white/european|english|      MARRIED|                  0|
|       NEWBORN|  Private|     F| 0.0|             2.0|              2.0|white/european|newborn|MARITAL-OTHER|                  0|
+--------------+---------+------+----+----------------+-----------------+--------------+-------+-------------+-------------------+
only showing top 10 rows
"""
```

Let's take a quick look at the distribution of age among the patients. The collect methods can take a while with large data sets any you should be careful to not collect so much data that you overflow your driver memory.

```python
import matplotlib.pyplot as plt
%matplotlib inline

# We will take sample 20% of our data to get a sense of the age distribution.
ages = [age[0] for age in data.select(data.AGE).sample(withReplacement=False, fraction=0.2).collect()]

plt.hist(ages, bins=30)
plt.suptitle('Distribution of Ages', size=24)
plt.ylabel('Counts', size=20)
plt.xlabel('Age', size=20)
plt.show()
```
![Age Histogram](images/age-histogram-1.png)

This chart shows a bimodal distribution that appears to be centered around newborns and the normal adult population, with essentially no instances of other children.

Let's take a look at the readmission rates for the different admission_types.

```python
sqlContext.sql("""select 
                    ADMISSION_TYPE,
                    AVG(CASE
                        WHEN DAYS_TO_READMISSION > 0 and DAYS_TO_READMISSION <= 30 THEN 1
                        ELSE 0
                        END) as 30day_readmission_rate,
                    AVG(CASE
                        WHEN DAYS_TO_READMISSION > 0 and DAYS_TO_READMISSION <= 90 THEN 1
                        ELSE 0
                        END) as 90day_readmission_rate  
                    FROM data 
                    GROUP BY ADMISSION_TYPE""").show()
                    
"""
+--------------+----------------------+----------------------+
|ADMISSION_TYPE|30day_readmission_rate|90day_readmission_rate|
+--------------+----------------------+----------------------+
|      ELECTIVE|  0.029766536964980543|  0.047470817120622566|
|       NEWBORN|   0.01778989741592001|   0.01856901701077782|
|        URGENT|  0.028938906752411574|   0.04823151125401929|
|     EMERGENCY|   0.04691737479660098|   0.08041041403001266|
+--------------+----------------------+----------------------+
"""
```
From here we can see that `NEWBORN` patients have a significantly lower readmission rate -- which is good, but these are probably not the people we want to focus on. Therefore, I have chosen to remove the instances of `NEWBORN` because I intend to focus on adressing readmissions for adults. My intution is that newborns may have an unexpected effect of boosting accuracy of a classifier in such a way that does not generalize to the adult population.

Another point worth nothing is that `EMERGENCY` readmissions rates are nearly twice as high as the other classes. This is likely to be a useful feature. 

```python
adults = data.filter(data.ADMISSION_TYPE != 'NEWBORN')
sqlContext.registerDataFrameAsTable(adults, "adults")
```

Let's see what the imbalance is between the people who were readmitted within 30 days and those wo were not

```python
sqlContext.sql("""SELECT
                    AVG(CASE
                        WHEN DAYS_TO_READMISSION > 0 and DAYS_TO_READMISSION <= 30 THEN 1
                        ELSE 0
                        END)
                    FROM adults""").show()
"""
+--------------------+
|                 _c0|
+--------------------+
|0.043355088574912146|
+--------------------+
"""
```
From this result we can see that this is a heavily imbalanced class -- about 1 patient is readmitted within 30 days for 23 patients that are not. This imbalance in the target will also pose problems to any classifier that is sensitive to class imbalance, e.g. Logistic Regression and Random Forest

One way we can handle this is to oversample from the minority class -- those who were readmitted -- until they are represented in roughly the same proportion as the those who were not readmitted. There are some sophisticated techniques for doing this such as Synthetic Minority Oversampling Technique (SMOTE), but we will use bootstrapping.

First, let's find all the instances of the positive class.

```python
positiveLables = sqlContext.sql("""SELECT * 
                                   FROM adults 
                                   WHERE DAYS_TO_READMISSION <= 30 
                                       AND DAYS_TO_READMISSION > 0
                                """)
```

Now, we will bootstrap by using the sample with replacement method.

```python
upsampled = positiveLables.sample(withReplacement=True, fraction=23.0)
sqlContext.registerDataFrameAsTable(upsampled, "upsampled")
```
Next, we combine the upsampled set with the original set of adults

```python
upsampledData = sqlContext.sql("""SELECT * FROM upsampled
                                  UNION ALL
                                  SELECT * FROM adults
                               """)
sqlContext.registerDataFrameAsTable(balanced, "balanced")
```

Finally, let's verify that the proportion of the positive class is reoughly requivalent to that of the negative class.

```python
sqlContext.sql("""SELECT
                    AVG(CASE
                        WHEN DAYS_TO_READMISSION > 0 and DAYS_TO_READMISSION <= 30 THEN 1
                        ELSE 0
                        END)
                    FROM balanced""").show()
"""
+------------------+
|               _c0|
+------------------+
|0.5212053771739326|
+------------------+
"""
```

The last step we want to take before starting the modeling process is to encode categorical variables. Many classifiers can handle cariables that are categorical as well as continuous. An example of a categorical variables is `GENDER` which -- in this dataset -- can only take the values of `M` or `F`. An example of a continuous variable is `AGE` which can take any value greater than 0. To encode `GENDER`, `M` can be represented by a `0` and `F` can be represented by a `1`. 

```python
from pyspark.sql.functions import udf

labelBinner = udf(lambda days: 1.0 if (days > 0) and (days <= 30) else 0.0, DoubleType())
labeledData = data.withColumn('label', labelBinner(data.DAYS_TO_READMISSION))
```

In this example I have chosen to remove the instances of NEWBORN because I intend to focus on adressing readmissions for adults. My intution is that newborns may have an unexpected effect of boosting accuracy of my classifier in such a way that does not generalize to the adult population.

We will seperate the data into a dataset that can be used training and validation with a holdout set that will not be used for any training purposes. This holdout data will serve as a final sanity check that our validated model generalizes to new data. 

Finally, we save the data.

```python
adults, holdout = labeledData.filter(labeledData.ADMISSION_TYPE != 'NEWBORN').randomSplit([0.9, 0.1])

# There is a known bug in Spatk 1.5 that causes writing DataFrames to CSV to fail when Tungsten is enabled.
sqlContext.setConf("spark.sql.tungsten.enabled", "false")

adults.coalesce(1).write.format("com.databricks.spark.csv").\
                          option("header", "true").\
                          save("adults.csv")
        
holdout.coalesce(1).write.format("com.databricks.spark.csv").\
                          option("header", "true").\
                          save("holdout.csv")
```



# 4. Training, Testing, Validating, and Deploying a Machine Learning Model

Import the modeling data and do some preliminary checks before we start modeling.

```python
df_adults = sqlContext.read.format('com.databricks.spark.csv').\
                                options(header='true', inferSchema=True).\
                                load('adults.csv')

df_holdout = sqlContext.read.format('com.databricks.spark.csv').\
                                options(header='true', inferSchema=True).\
                                load('holdout.csv')

# Print the schema to make sure that our data were loaded as the correct type.
df_adults.printSchema()

"""
root
 |-- ADMISSION_TYPE: string (nullable = true)
 |-- INSURANCE: string (nullable = true)
 |-- GENDER: string (nullable = true)
 |-- AGE: double (nullable = true)
 |-- AVG_DRG_SEVERITY: string (nullable = true)
 |-- AVG_DRG_MORTALITY: string (nullable = true)
 |-- ETHN: string (nullable = true)
 |-- LANG: string (nullable = true)
 |-- STATUS: string (nullable = true)
 |-- DAYS_TO_READMISSION: integer (nullable = true)
 |-- label: double (nullable = true)
"""

print("We have %d training instances and %d holdout instances." % (df_adults.count(), df_holdout.count()))
"""
We have 25056 training instances and 2830 holdout instances.
"""
```

In this case, `AVG_DRG_SEVERITY` and `AVG_DRG_MORTALITY` have been read in as strings instead of doubles. This will need to be corrected before we do any modeling. You never know and should always check 

```python
# We will cast these string variables as double types
intermediateDF = df_adults.withColumn("AVG_SEVERITY", df_adults.AVG_DRG_SEVERITY.cast(DoubleType()))
adults = intermediateDF.withColumn("AVG_MORTALITY", intermediateDF.AVG_DRG_MORTALITY.cast(DoubleType()))
```

We handled any missing values earlier, so the next step just a pre-modleing check. Most algorithms do not handle missing data and will throw an exception -- requireing you to replace those missing values witt something. 


```python
# Prints the name of the column that has any missing values.
for col in df_adults.columns:
    if df_adults.where(df_adults[col].isNull()).count() > 0:
        print col
```
There is an entire sub-field of data analysis devoted to imputation of missing data, however, three common methods for imputing missing values are using the mean or median value of a column, replacing it with zero, or dropping it entirely. You can also perform tests to see if the missing values are missing at random or if there is a statisitcally significant number of missing values -- thereby necessitating a prudent imputation stratedgy, e.g. mean, meadian, or fitting a model that can identify a pattern from the other data fields to try and learn what is likely to be in a good value for the missing fields.  

Encode categorical variables as numeric values for ingestion by an algorithm. PySpark has a built-in feature called `StringIndexer` that can be very useful for this purpose. The `StringIndexer` will take as input a column of string valued rows and replace them with numerical values, e.g. all instances `Cat` are replaced with a `0.0` and `Dog` with a `1.0`.

I am choosing to not use this feature because `StringIndexer` will repalce the most frequently encounter value with `0.0` and the next most frequent value with `1.0`, and so on. Since some of my categorical features are very uncommon, they may end up being represented differently between different training and testing splits during cross validation. To ensure consistency in how categorical values are encoded, I will manually manually specify the encodings.

We can use SparkSQL to do this.

```python
# Encode all categorical variables as numeric
categoricalEncodingQuery =  """

SELECT 
    CASE
        WHEN ADMISSION_TYPE LIKE 'NEWBORN' THEN 0.0
        WHEN ADMISSION_TYPE LIKE 'EMERGENCY' THEN 1.0
        WHEN ADMISSION_TYPE LIKE 'URGENT' THEN 2.0
        ELSE 3.0
        END as admission_type,
    CASE 
        WHEN INSURANCE LIKE 'Private' THEN 0.0
        WHEN INSURANCE LIKE 'Medicare' THEN 1.0
        WHEN INSURANCE LIKE 'Medicaid' THEN 2.0
        WHEN INSURANCE LIKE 'Government' THEN 3.0
        WHEN INSURANCE LIKE 'Self Pay' THEN 4.0
        ELSE 5.0
        END as insurance,
    CASE
        WHEN GENDER LIKE 'M' THEN 0.0
        WHEN GENDER LIKE 'F' THEN 1.0
        ELSE 2.0
        END as gender,
    IF (AGE > 200, 91, AGE) as age,
    IF (AVG_SEVERITY IS NULL, 0, AVG_SEVERITY) as avg_severity,
    IF (AVG_MORTALITY IS NULL, 0, AVG_MORTALITY) as avg_mortality,
    CASE
        WHEN ETHN LIKE 'white/european' THEN 0.0
        WHEN ETHN LIKE 'black/african' THEN 1.0
        WHEN ETHN LIKE 'hispanic/latino' THEN 2.0
        WHEN ETHN LIKE 'mideastern' THEN 3.0
        WHEN ETHN LIKE 'asian/indian' THEN 4.0
        ELSE 5.0 
        END as ethn,
    CASE 
      WHEN ADMISSION_TYPE='newborn' THEN 0.0
      WHEN LANG='english' THEN 1.0
      WHEN LANG='other' THEN 2.0
      ELSE 3.0
      END as lang,
    CASE
      WHEN STATUS LIKE 'NEWBORN' THEN 0.0
      WHEN STATUS LIKE '' OR STATUS LIKE 'LIFE PARTNER' THEN 1.0
      WHEN STATUS LIKE 'UNKNOWN%' THEN 2.0
      WHEN STATUS LIKE 'MARRIED' THEN 3.0
      WHEN STATUS LIKE 'DIVORCED' THEN 4.0
      WHEN STATUS LIKE 'SINGLE' THEN 5.0
      WHEN STATUS LIKE 'WIDOWED' THEN 6.0
      WHEN STATUS LIKE 'SEPARATED' THEN 7.0
      ELSE 8.0
      END as status,
    DAYS_TO_READMISSION as days_to_readmission,
    label
FROM {0}

"""

# Encode the categorical values.
sqlContext.registerDataFrameAsTable(adults, "adults")
encodedData = sqlContext.sql(categoricalEncodingQuery.format("adults"))

encodedData.show(5)
"""
+--------------+---------+------+----+------------+-------------+----+----+------+-------------------+-----+
|admission_type|insurance|gender| age|avg_severity|avg_mortality|ethn|lang|status|days_to_readmission|label|
+--------------+---------+------+----+------------+-------------+----+----+------+-------------------+-----+
|           1.0|      1.0|   1.0|76.3|         2.0|          2.0| 1.0| 1.0|   6.0|                  0|  0.0|
|           1.0|      0.0|   1.0|49.9|         3.0|          2.0| 0.0| 1.0|   3.0|                 66|  0.0|
|           3.0|      1.0|   1.0|72.6|         0.0|          0.0| 5.0| 3.0|   3.0|                  0|  0.0|
|           3.0|      0.0|   1.0|59.5|         2.0|          2.0| 1.0| 1.0|   5.0|                  0|  0.0|
|           1.0|      1.0|   0.0|73.2|         3.0|          3.0| 4.0| 2.0|   6.0|                  0|  0.0|
+--------------+---------+------+----+------------+-------------+----+----+------+-------------------+-----+
only showing top 5 rows
"""
```

* Data preperation for modeling: build the feature vectors and index the label

```python
from pyspark.ml.feature import StringIndexer, VectorAssembler

# Specify the features that we want in the feature vectors
featureCols = ['admission_type', 'insurance', 'gender', 
               'ethn', 'lang', 'status', 'avg_severity', 
               'avg_mortality', 'age']

# Specify the transformations to use prior to modeling, e.g. assemble a DenseVector of features
assembler = VectorAssembler(inputCols=featureCols, outputCol='features')

# StringIndexer will numerically encode categorical features.
labelIndexer = StringIndexer(inputCol='label', outputCol='indexedLabel')

assembled = assembler.transform(encodedData)
labeledVectors = labelIndexer.fit(encodedData).transform(assembled)

# These are the columns that ML algorithm will need as input for training
labeledVectors.select("features", "indexedLabel").show(5)
"""
+--------------------+------------+
|            features|indexedLabel|
+--------------------+------------+
|[1.0,1.0,1.0,1.0,...|         0.0|
|[1.0,0.0,1.0,0.0,...|         0.0|
|[3.0,1.0,1.0,5.0,...|         0.0|
|[3.0,0.0,1.0,1.0,...|         0.0|
|[1.0,1.0,0.0,4.0,...|         0.0|
+--------------------+------------+
only showing top 5 rows
"""
```
Now we are ready to train an initial model.

```python
from pyspark.ml.classification import RandomForestClassifier

rfc = RandomForestClassifier(labelCol="indexedLabel", featuresCol="features")
```

The Spark `Pipeline` object allows us to string together different transformers and estimators into a pipeline that can be applied over repeatedly to different datasets.

```python
train, test = encodedData.randomSplit([0.8, 0.2])
print("We have %d training instances and %d validation instances." % (train.count(), test.count()))
"""
We have 19982 training instances and 5074 validation instances.
"""

from pyspark.ml import Pipeline

rfcPipeline = Pipeline(stages=[assembler, labelIndexer, rfc])

# Create an initial Random Forest model
initialModel = rfcPipeline.fit(train)
```

With a trained model let's create a set of predictions and score them.

```python
# Create an initial set of prediction.
initialPredictions = initialModel.transform(test)

collected = initialPredictions.select('probability', 'label').collect()

# Creating a list of tuples with probabilities and labels, 
# e.g. [(prob1, label1), (prob2, label2), ...]. 
# Be sure to convert the prob value from a numpy flaot to a regular float,
# otherwise the PySpark BinaryClassificatioMetrics will throw a datatype exception.

scoreLabelPairs = [(float(row[0][1]), row[1]) for row in collected]

# Create an RDD from the scores and labels
scoresAndLabels = sc.parallelize(scoreLabelPairs, 2)

from pyspark.mllib.evaluation import BinaryClassificationMetrics

metrics = BinaryClassificationMetrics(scoresAndLabels)
print "Area Under the ROC Curve: ", metrics.areaUnderROC
"""
Area Under the ROC Curve:  0.642869055243
"""
```

Model training can take a while depending on the size of your data, how many trees you want in your ensemble, and the depth that you allow your trees to go. In general, you want each tree to be constructed to the maximum depth permissable by your time and computational resources. This will inherently overfit your data on any given tree, but since your are constructing many different trees from random bootstrapped samples of the data, each tree is overfitting in a slightly different way. A given prediction is made when a datapoint is fed through each tree in the forest and the tree votes on the classification for that datapoint. The votes are tallied and then prediciton is made by taking the majority vote of the trees. The end result is that the high variance between individual trees will average out over the entire forest.

We will now demonstrate how to tune one model paramter while also demonstrating how to prevent overfitting your data.

```python
trainData, testData = encodedData.randomSplit([0.8, 0.2])
print("We have %d training instances and %d validation instances." % (trainData.count(), testData.count()))
"""
We have 19964 training instances and 5092 validation instances.
"""

# We will try these settings for maxDepth
maxDepthSettings = [1, 2, 4, 6, 8, 10, 12, 14]

# Helper function that creates models for every depth in maxDepthSettings
def createModel(depth, data):
    rfc = RandomForestClassifier(labelCol="indexedLabel", featuresCol="features", maxDepth=depth)
    rfcPipeline = Pipeline(stages=[assembler, labelIndexer, rfc])
    rfcModel = rfcPipeline.fit(trainData)
    return rfcModel

# Function to take a model and score it using Binary Classificaiton Metrics
def scoreBinaryModel(model, data):
    predictions = model.transform(data)
    collected = predictions.select('probability', 'label').collect()
    scoreLabelPairs = [(float(row[0][1]), row[1]) for row in collected]
    scoresAndLabels = sc.parallelize(scoreLabelPairs, 2)
    metrics = BinaryClassificationMetrics(scoresAndLabels)
    return metrics
    
# Create models
models = map(lambda depth: createModel(depth, trainData), maxDepthSettings)

# Calculate AUC-ROC for each model:
trainMetrics = map(lambda model: scoreBinaryModel(model, trainData), models)
trainScoresROC = [metric.areaUnderROC for metric in trainMetrics]

testMetrics = map(lambda model: scoreBinaryModel(model, testData), models)
testScoresROC = [metric.areaUnderROC for metric in testMetrics]
```

With the scores for the models trained with different depth settings we will plot the results.

```python
import matplotlib.pyplot as plt
%matplotlib inline

plt.figure(figsize=(12, 8))
plt.plot(maxDepthSettings, testScoresROC, 'r-', label='Test Performance')
plt.plot(maxDepthSettings, trainScoresROC, 'b-', label='Train Performance')
depthAtMaxROC = maxDepthSettings[testScoresROC.index(max(testScoresROC))]
plt.plot(depthAtMaxROC, max(testScoresROC), linestyle='None', marker="*", color='y', markersize=20)
plt.xlabel('maxDepth', size=16)
plt.ylabel('Area Under the ROC Curve', size=16)
plt.ylim(ymin=0.5, ymax=0.8)
plt.legend()
plt.title('Tuning maxDepth: Evaluation and Overfitting', size=20)
plt.show()
```
![Random Forest Overfitting](images/rf-overfitting.png)

Now we will try different modeling to see how well we can predict whether or not a patient will be readmitted. First, let's import `RandomForest`.
```python
rf = RandomForest()
```
One of the nice properties of Random Forest is the ability to handle categorical variables as well as continuous variables. We can just use the categorical variables as they are right now, e.g. {0, 1, 2, ...}, as the model can work with them, however the model will assume that they are continuous unless otherwise specified. This is exactly what the `categoricalFeaturesInfo` paramter of the `model.train()` method is for. MLlib asks for a data structure called an arity for `categoricalFeaturesInfo`. This just means that we need to give the model a dictionary of the column indexes (0-based) with the number of distinct categorical values in that column.

Here is how we construct the arity.

```python
categoricalCols = ['admission_type', 
                   'insurance', 
                   'gender', 
                   'ethn', 
                   'lang', 
                   'status']

catFeatureInfo = {}

for i, col in enumerate(categoricalCols):
    catFeatureInfo[i] = dfWithLabel.select(col).distinct().count()
print catFeatureInfo
"""
{0: 3, 1: 5, 2: 2, 3: 6, 4: 3, 5: 6}
"""
```

Now we have to build an RDD of LabeledPoints for inut into the `RandomForest`.

```python
from pyspark.ml.feature import VectorAssembler
from pyspark.mllib.regression import LabeledPoint

featureCols = ['admission_type', 
                'insurance', 
                'gender', 
                'ethn', 
                'lang', 
                'status', 
                'avg_severity', 
                "avg_mortality", 
                'age']

va = VectorAssembler(inputCols=featureCols, outputCol='features')

vectors = va.transform(dfWithLabel)
labeledPoints = vectors.select("label", "features").map(lambda row: LabeledPoint(row.label, row.features))

labeledPoints.take(5)
"""
[LabeledPoint(1.0, [1.0,1.0,1.0,1.0,1.0,4.0,4.0,4.0,66.1]),
 LabeledPoint(1.0, [1.0,1.0,1.0,1.0,1.0,4.0,4.0,4.0,66.1]),
 LabeledPoint(1.0, [1.0,1.0,1.0,1.0,1.0,4.0,4.0,4.0,66.1]),
 LabeledPoint(1.0, [1.0,1.0,1.0,1.0,1.0,4.0,4.0,4.0,66.1]),
 LabeledPoint(1.0, [1.0,1.0,1.0,1.0,1.0,4.0,4.0,4.0,66.1])]
"""
```





* Now let's make predictions and test the results
```python
predicted_frame = model.predict(testFrame, feature_cols)

test_metrics = model.test(predicted_frame, 'target_30', feature_cols)

print test_metrics

"""
Precision: 0.142857142857
Recall: 0.00917431192661
Accuracy: 0.95882246704
FMeasure: 0.0172413793103
Confusion Matrix: 
            Predicted_Pos  Predicted_Neg
Actual_Pos              2            216
Actual_Neg             12           5307
"""
```
## Model Hyperparameter Tuning
* Grid Search and Cross Validation
This section under construction. 

## Deploying the Model
* Once we are satisified with the performance of our model we want to put it into production. To do that we use the `model.publish()` method to serialize the model and write it to HDFS.
```python
model.publish()
"""
u'hdfs://nameservice1/org/3344b8a7-f814-4343-903e-ca914317bee3/brokers/userspace/aeab8785-03bb-4ac7-93b1-a5a46abb9a82/atk-intel-be107c9e/models_3fe4c46e705c4bb697e7546cfcbecbc8.tar'
"""
```
Be sure to copy the above uri for your model.

* Go back to the TAP Console and select Services -> Marketplace -> TAP Scoring Engine.
* Create a name for your scoring engine instance, e.g. my-model-as-an-api. Ensure that you select the "Add an extra paramter". For `key` enter `uri`. For `value` enter the long HDFS uri that you copied after calling `model.publish()`. In case you forogt to copy it and no longer have your Jupyter notebook up and running, go to the Data Catalog and select the `TAR` format under "Advanced Search". You should see your model here and can click on the filename to get the `targetUri`.
* Click on "Create new instance"
* Congratualtions, your model is now available as a REST API that you can pass datapoints to over http!
