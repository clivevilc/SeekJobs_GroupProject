# Job Board Group roject

**SeekJobs** dashboard

- Web scraping job websites and creating a dashboard of most in-demand skills within IT. 
- Roles: Job hunters and admins 
- Backend storing all job information (location, type, salary)
- Content is loaded into a dashboard, depending on the interests of the job hunter
- Job hunters can search for jobs based on, job type, salary, company
- Web scraper will update the database of jobs with new jobs every week


====Specsheet====
https://docs.google.com/spreadsheets/d/1jVJO3C9IrchGuDM1eXZ1xsUDNpS8jAJDka0C_dT-Adg/edit#gid=0


###Backend API
***

###Job listing route
GET all job listing '''/api/listings'''

####User credentials routes
GET all user applicant credentials '''/api/credentials''' 
POST create a new applicant credential '''/api/credentials'''

GET an individual user credential '''api/user/credential/:userName'''
DELETE an individual user credential '''api/user/credential/:userName'''

####User Employer routes
GET job listing listed by user employer '''/api/listing/:userName'''
POST new job listing by user employer '''api/listing/:userName'''

###User applicant routes
GET all user information '''/api/users'''
GET an invidual user information '''/api/user/:userName'''
PUT update an individual user information '''/api/user/:userName'''

GET user saved listing '''/api/user/:userName/saved'''
POST user saved listing '''/api/user/:userName/saved'''
DELETE user saved listing '''/api/user/:userName/saved'''

