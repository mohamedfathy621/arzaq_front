class Input_Feilds {
    constructor(label, type, placeholder, name, small ) {
        this.label = label;
        this.type = type;
        this.placeholder = placeholder;
        this.name = name;
        this.small = small;
    }
}
class Input_Forms {
    constructor(name,fields,header){
        this.name = name;
        this.fields = fields;
        this.header = header
    }
}
const username_input=new Input_Feilds('User Name','text','Example123','username',{color:'red',display:'block',content:'user name should contain numbers and letters only'})
const password_input=new Input_Feilds('Password','password','******************','password',{color:'red',display:'block',content:'password should be 8 characters long and contain atleast a number a letter'})
const confrim_password_input=new Input_Feilds('Confirm Password','password','******************','password-confirm',{color:'red',display:'block',content:'rewrite the password to confirm'})
const email_inpput = new Input_Feilds('Email','email','example123@site.com','email',{color:'red',display:'block',content:'please enter a valid email'})
const register_feilds=[username_input,password_input,confrim_password_input,email_inpput]
const register_form= new Input_Forms('REGISTER',register_feilds,'Join our customers')

const login_username=new Input_Feilds('User Name','text','','username',{color:'red',display:'none',content:'invalid user name'})
const login_password=new Input_Feilds('Password','password','','password',{color:'red',display:'none',content:'invalid password'})
const login_form=new Input_Forms('LOG IN',[login_username,login_password],'Welcome Back')

const name=new Input_Feilds('name','text','Example','name',{color:'red',display:'block',content:'name should contain  letters only'})
const titles=new Input_Feilds('titles','text','engineer/ceo','name',{color:'red',display:'block',content:'titles should contain  letters only'})
const description=new Input_Feilds('description','text','i have a very big dick','name',{color:'red',display:'block',content:'name should contain  letters only'})
const imageurl= new Input_Feilds('imageurl','text','https:sexy/women','name',{color:'red',display:'block',content:'choose a vaild image url'})
const profile_fields=[name,titles,description,imageurl]
const profile_form=new Input_Forms('save data',profile_fields,'edit your data')
export {register_form,login_form,profile_form}