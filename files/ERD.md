# Database Tables

## Admin Table
| Field      | Type      | Options       |
|------------|-----------|---------------|
| _id        | ObjectId  |               |
| username   | String    |{requied: true}|
| password   | String    |{requied: true}|

## Items Table                                                  
| Field             | Type      | Options       |
|-------------------|-----------|---------------|
| _id               | ObjectId  |               |
| ItemName          | String    |{requied: true}|
| ItemPrice         | Number    |{requied: true}|
| ItemDescription   | String    |               |
| ItemImg           | Image     |               |
| ItemCategory      | String    |{requied: true}|

## Category Table
| Field         | Type      | Options       |
|---------------|-----------|---------------|
| _id           | ObjectId  |               |
| CategoryName  | String    |{requied: true}|




### Relationships
- **One-to-Many**: One Category can have many Items, but each Item belongs to one Category.