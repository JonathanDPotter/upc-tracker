# UPC tracker API

## personal utility for tracking the process of UPCs I have entered for review

### Overview

This is the API for a UPC tracking utility that I will use to track the status of UPCs that I have submitted for maintenance or review. It can be difficult to remember what UPCs I have already submitted and where they are in the process with central data.

I can use it to store groups of UPCs and name the groups with a useful title.

For example, I can enter 5 UPCs and title the group "submitted as UNFI DIS". This will let me know that I have submitted the 5 UPCs to central data as showing up on my UNFI invoice as discontinued. I can then avoid submitting them again. I plan to include fnctionality into the front-end that will filter out previously used UPCs and let me export them in excel format.

---

### Routes

/
-GET -returns welcome message

/api/user

- GET/ -returns all users
- GET/:\_id -returns user with \_id provided
- GET/validate -validates bearer token
- POST/register -accepts {username, password} creates a new user
- POST/login -accepts{username, password} returns authentication token
- PUT/:\_id -updates user with \_id provided
- DELETE/:\_id -deletes user with \_id provided

/api/group

- GET/ -returns all groups
- GET/:\_id -returns group with \_id provided
- POST/, creates a group, must have [protected route]
- PUT/:\_id -updates group with \_id provided [protected route]
  -DELETE/:\_id -deletes group with \_id provided [protected route]
