# URL SHORTENER

Full-fledged URL shortener service with

---

- Public and private urls
- User login and signups
- User signup must be validated using a confirmation email
- Ownership of URLs
- URL expiry
  - When a URL expires, the user must be notified using email
- Rate-limit per IP to 5 req/sec
- Analytics
  - Number of hits for a URL
  - IP
  - Which browser the user was on
  - Filter analytics on basis of time start & end
- Deployment using a managed service like Render

## How is this project setup done?

### Installation

```
$ npm i -g @nestjs/cli
$ nest new url_shortener
```

### Installing typeorm and postgres

```
$ npm install --save @nestjs/typeorm typeorm mysql2
```
