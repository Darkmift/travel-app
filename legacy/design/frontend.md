# Frontend design:

## Layout
main design of the app:
- main layout 
  - This code defines a React component called "MainLayout" that serves as a basic layout structure for a web page, including a header, main content area, and navigation menu.
- header (which will appear at all time)
- menu admin/user with authorization accordingly
- Routing to local components : `auth routes` ,`holiday routes`, `admin routes` 

# Pages
## Auth
  - Login component :
   - login box : 
      - header
      - input field : `email`, `password`
      - submit button - make a request and the server will return credentials via jwt
      - navigation button for signUp a new user
  - Signup component:
       - header
      - input field :`first name`, `last name`, `email`, `password`
      - submit button - make a request and the server will return Token via jwt
      - navigation button login


## Holidays
- Home Holiday component:
   - header
   - menu bar contains filterd holiday with Checkbox : `current holiday`, `upcoming holidays`, `following holidays`
     - current holiday display filter pagination current holidays
     - upcoming holiday display filter pagination upcoming holidays
     - following holidays display filter pagination holidays by followers count (highest number to lowest number)
   - main Card list view 
   - bottom pagination : 9 cards per page
  
- Card List component:
   - user mode:
     - Card contains data of holiday from api: `Destination`, `Description`, `Start Date`, `End Date `, `Price`, `Image`
     - Follow button that make user follow holiday + displays the follower counts for the specific Holiday
   - admin mode:
     - Card contains data of holiday from api: `Destination`, `Description`, `Start Date`, `End Date `, `Price`, `Image`
     - Edit icon button : edit the holiday by id
     - Delete icon button : delete the holiday by id

## Admin
- Home Admin component:
   - header
   - menu bar contains: `add holiday button`, `holidays/follower Report button`, `sign Out button`
   - main Card list view 
     - bottom pagination : 9 cards per page

- Add\Edit Holiday component:

- uses `handleSubmit` , `editmode (for editing the holiday)` , `holiday`
   - menu bar contains: `add holiday button`, `holidays/follower Report button`, `sign Out button` , `Back home button`
   - Edit Holiday Box : `admin/Edit-holiday`
      - header
      - input field :`Destination`, `Description`, `Start Date`, `End Date `, `Price`, `Image`
        - all input fields are with data fetched from api endpoint "../EditHoliday"
  
   - Add Holiday Box :  `admin/add-holiday`
      - header
      - input field :`Destination`, `Description`, `Start Date`, `End Date `, `Price`, `Image`
        - all fields are empty and required
      - for both views edit /add:
        - dates pickers has to be with logic presented in the requirement document
        - image upload button with "fileUpload" method
        - submit button
  
- Holiday Reports component:
   - header
   - Graph fetch data from api endpoint : `followers-holidays-report`:
    - axis y = counts of follower via server service followerCounts
    - axis x = present the holidays via server service getAllHoliday 
  

## HttpClient
- api index endpoint to server via cors `baseURL + "/auth/`,`baseURL + "/holidays/`,`baseURL + "/admin/`
- notifcation service : defines a notification service using the "notyf" library
- interceptor service : defines


### Redux
- authState :`authActions`, `authReducer` ,`authStore`
   -This code defines a Redux store and associated actions, reducers, and initial state for managing authentication state, including user tokens and user data.
- holidayState :`holidayActions` ,`holidayReducer`, `holidayStore`
- followerState :`followerActions`, `followerReducer` ,`followerStore`

### Zustand
- authState: 
    - Mutations/Actions
      - login
      - signup
      - logout
    - state
      - user (`id,role,....`)
- Holidays:
    - Mutations
      - getAll
      - toggleFollow(`user.id,holiday[0].id`)
    - state 
      - (holidays)
- Admin:
    - Mutations/Actions
      - login
      - signup
      - logout
      - addHoliday
      - editHoliday
      - deleteHoliday
    - state
      - user (`id,role,....`)

# Routing

## Admin:
 - Dashboard
    - Add
    - Edit
    - Report
      (Graph,download csv)
## User:
 - Main ('/')
## Auth
 - Login
 - Signup


## TEMP:

```tsx
type InputState = {value:any,type:'text'|'number'|'hidden'}
type ActionItem = {label:string,callback:()=>void}
type FormState = {
  title:string,
  values:{
    [key:string]:InputState
  },
  actionItems:{
       [key:string]:ActionItem
  }
}



const Form = (formState:FormState) => {

  // lets use https://react-hook-form.com/get-started

  return <FormContainer>
    <Title />
    <FieldList>
    {formState.values.map((inputState)=><Input {...inputState}/>)}
    </FieldList>

    <ButtonList>
   {formState.actions.map((buttonState)=><Button {...buttonState} />)}
    </ButtonList>

    {hasLinksData && <Links text="hasLinksData.already have user?" link={txt:'hasLinksData.text',to:'hasLinksData.link'} />}
  </FormContainer>
}

// LOGIN PAGE

const LoginPage = ()=>{


  const loginHanlder = ()=>{}

  //example 
  const formState = {
    title:'FORM_TITLE',
    values:{
      email:{value:'',type:'text'}
      password:{value:'',type:'text'}
    },
    actionItems:{
      submit:{
        label:'Login',
        callback:loginHanlder
      }
    }
  }


  <Form title={'Login'} formState={formState}>
}

const SignupPage = ()=>{


  const signUpHandler = ()=>{}

  //example 
  const formState = {
    title:'Signup',
    values:{
      email:{value:'',type:'text'},
      fname:{value:'',type:'text'},
      lname:{value:'',type:'text'},
      password:{value:'',type:'text'}
    },
    actionItems:{
      submit:{
        label:'SignUp',
        callback:signUpHandler
      }
    }
  }


  <Form title={'SignUp'} formState={formState}>
}

const EditForm = ()=>{


  const editHandler = ()=>{}

  //example 
  const formState = {
    title:'Edit Holiday',
    values:{
      name:{value:'',type:'text'},
      image:{value:{/*File*/},type:'file'},
      /**/
    },
    actionItems:{
      submit:{
        label:'Save Edit',
        callback:editHandler
      }
    }
  }


  <Form title={'SignUp'} formState={formState}>
}
```

