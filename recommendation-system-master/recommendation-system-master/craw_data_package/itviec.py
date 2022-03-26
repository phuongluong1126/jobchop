from numpy.lib.type_check import imag
import pandas as pd
import re
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import asyncio

def FetchData(begin, stop):
    list_url = []
    province = []
    time = []
    logo = []
    browser = webdriver.Chrome()
    for i in range(begin,stop):
        browser.get('https://itviec.com/it-jobs?page={}&query=&source=search_job'.format(i))
        browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        list_job=browser.find_elements_by_xpath("//h2[@class='title']/a")
        list_province=browser.find_elements_by_class_name("address")
        list_time=browser.find_elements_by_class_name("distance-time") 
        list_logo=browser.find_elements_by_xpath("//img")
        for index in range(len(list_job)):
            time.append(list_time[index*2+1].text)
        for item in list_province:
            province.append(item.text.split("\n"))
        for index in range(len(list_job)):
            logo.append(list_logo[index+2].get_attribute('data-src'))
        for job in list_job:
            if job.get_attribute('href')!=None:
                list_url.append(job.get_attribute('href'))
    print(len(list_url))
    print(len(province))
    print(len(time))
    print(len(logo))
    job_title = []
    company  = []
    location = []
    salary = []
    job_description = []
    requirement = []
    benefit = []
    ids = []
    for index,url in enumerate(list_url):
        browser.get(url)
        job_title.append(browser.find_elements_by_class_name("job-details__title")[0].text)
        company.append(browser.find_elements_by_class_name("employer-long-overview__name")[0].text)  
        location.append((browser.find_elements_by_class_name("svg-icon__text"))[1].text)
        salary.append("Thương lượng")
        job_description.append((browser.find_elements_by_class_name("job-details__paragraph"))[0].text.split("\n"))
        requirement.append((browser.find_elements_by_class_name("job-details__paragraph"))[1].text.split("\n"))
        try:
            benefit.append((browser.find_elements_by_class_name("job-details__paragraph"))[2].text.split("\n"))
        except:
            benefit.append("")
        ids.append(index+1)

    df = pd.DataFrame({"Id":ids,"Job Title": job_title, "Company Name": company,"Time": time, "Province": province, "Location": location, "Salary": salary, "Job Desription": job_description, "Requirements": requirement, "Benefits": benefit, "Link": list_url,"Logo": logo})
    df.to_csv(r'./dataset/data.csv', sep='\t', encoding='utf-8', header='true')
    bag = ["typescript","english","golang","python", "c#", "c++","dart","kotlin","java","javascript","html", "css","php", "swift","ruby","Objective-C","iis","tomcat","weblogic","ibm","ui-ux","responsive","mvvm","rest","restapi","soap","webservice","postman","web api","webapi","bootstrap","jquery","ajax","j-query","wcf","asp",".net",".net core","mvc","entity framework","numby","pandas","ml","ai","scikit-learn","django","flask","pytorch","keras","tensorflows","jenkins","circleci", "ci/cd","spring","j2ee","xpath","erp","laravel","ruby on rails","express","angular", "vue", "react","node","typescript","game","designer","oop","algorithm","architectural patterns","system design","data structure","flutter","hybrid","xcode","ios","testflight","avfoundation","xml","json","xamarin","unity","apache","cloud","devop","linux","virual","microservice","docker","kubernetes", "azure","git","hadoop","flink","spark","test","qa","qc","unit test", "integration test", "automation test","selenium", "desgin pattern","blockchain","aws","system","cassandra","sql server","mysql","oracle","mongodb","firebase","sqlserver","postgresql","db2","redis","sqlite","access","elasticsearch","nosql","webdriver","cucumber","agile","scrum","bitbucket","maven","gradle","trello","ssl","tls","winform","3d design","swagger"]
    list_skill = []
    for index,job in enumerate(requirement):
        skill = ""
        for word in bag: 
            if (job_title[index].lower().find(word)!=-1):
                skill=skill+word+"|"
            else:
                for row in job:
                    if (row.lower().find(word) != -1):
                        skill=skill+word+"|"
                        break  
        list_skill.append(skill)
    dfskill = pd.DataFrame({"Id":ids,"Job Title": job_title, "Skill": list_skill})
    dfskill.to_csv(r'./dataset/recipes.csv', encoding='utf-8', header='true', index=False)

