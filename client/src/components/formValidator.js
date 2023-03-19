

const formValidator = (values)=>{

  let errors = {};

  if(!values.name){
      errors.name = "Name is required";
  }
 
  if(!values.email){
      errors.email="email required"
  }
  else if(!/^[A-Z0-9._%+-]+@[A-Z-9._%-]+\.[A-Z]{2,}$/i.test(String(values.email).toLocaleLowerCase())){
      errors.email="email is Invalid"
  }



  if(!values.password){
      errors.password=" Password required"
  }else if(values.password.length < 8){
      errors.password ="Password must be at least 8 characters"
  }else if(!/^(?=.*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[!@$%&])[a-zA-Z0-9?!@#$%&]{8,16}$/ig){
    errors.password =`Password must contain at least two uppercase\n
    letters and two numbers and one special character`
}

  if(!values.answer1){
    errors.answer1 = "Answer is Required";
  } 

  if(!values.answer2){
    errors.answer2 = "Answer is Required";
  }


  return errors
}

export default formValidator