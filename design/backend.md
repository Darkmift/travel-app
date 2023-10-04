# write a server design for the application


## End points



- Auth
  - Login ` auth/login `
  - Signup ` auth/signup `

- Admin
  - crud holidays ` admin/holidays {GET,POsT,PUT,DELETE} `
  - get holidays joined with followers ` admin/holidays-follower-report {GET} `

- holidays
  - get holidays paginated and filtered by mode: (current,upcoming,following) ?mode="upcoming"&page="0"&limit="default 9"
    joined with where followerId = id of user logged in ` holidays {GET} `

## AUTH
    ### Authorization
            middleware that will authenticate - login gives jwt and user role
    ### Authentication
            middleware pre requests for `holidays` for user