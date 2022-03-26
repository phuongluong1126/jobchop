import pandas as pd
import re
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

def FetchData():
    list_url = []
    browser = webdriver.Chrome()
    browser.get("https://secure.vietnamworks.com/login/vi?client_id=3&utm_source=&utm_medium=Header")
    username = browser.find_element_by_id("email")
    username.send_keys("dqh.cib@gmail.com")
    password = browser.find_element_by_id("login__password")
    password.send_keys("Dqhcib12345")
    login_button = browser.find_element_by_id("button-login")
    login_button.click()
    browser.get("https://www.vietnamworks.com/tim-viec-lam/tat-ca-viec-lam")
    list_job = browser.find_elements_by_class_name("job-title")
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    list_url = []
    for job in list_job:
        if job.get_attribute('href')!=None:
            print(job.get_attribute('href'))
            list_url.append(job.get_attribute('href'))
    job_title = []
    company  = []
    location = []
    salary = []
    job_description = []
    requirement = []
    benefit = []
    for url in list_url:
        browser.get(url)
        job_title.append(browser.find_elements_by_xpath("//h1[@class='job-title']")[0].text)
        company.append(browser.find_elements_by_class_name("company-name")[1].text)
        location.append(browser.find_elements_by_class_name("location-name")[0].text)
        salary.append(browser.find_elements_by_class_name("salary")[0].text)
        job_description.append(browser.find_elements_by_class_name("description")[0].text)
        requirement.append(browser.find_elements_by_class_name("requirements")[0].text)
        benefit.append(browser.find_elements_by_class_name("benefits")[0].text)
    df = pd.DataFrame({"Job Title": job_title, "Company Name": company, "Location": location, "Salary": salary, "Job Desription": job_description, "Requirements": requirement, "Benefits": benefit})
    return df