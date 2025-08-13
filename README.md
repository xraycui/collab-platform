# collab-platform
Real-time Task Collaboration Platform (Trello + Slack clone)

# Overview: RealTime Task Collaboration Platform 
- Think of a Trello + Slack hybrid:
* Real-time task boards (like Trello)
* Chat feature (via WebSocket)
* User authentication (JWT)
* Notifications (RabbitMQ + Redis)
* Microservices w/ REST & AWS Lambda
* DB mix (PostgreSQL for structured data, MongoDB for flexible task details, DynamoDB for logs)

# Tech Stack Breakdown
| Layer     | Tech                                   |
| --------- | -------------------------------------- |
| Frontend  | ReactJS (user side) + Angular (admin)  |
| Backend   | NodeJS + Express + WebSocket           |
| DB        | PostgreSQL, MongoDB, Redis, DynamoDB   |
| Auth      | JWT (access/refresh), cookie/session   |
| Messaging | RabbitMQ (task queue), Redis (pub/sub) |
| Cloud     | AWS Lambda, API Gateway, RDS, DynamoDB |
| Infra     | AWS CDK, Route 53                      |
