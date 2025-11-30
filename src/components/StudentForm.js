import { useState } from "react"
import "./StudentForm.css"

function StudentForm() {
    // create the state variable
    const [student, setStudent] = useState({
        name: "",
        age: "",
        course: ""
    })

    // to handle the values in the input field we have to create hanldeChange function 

    const handleChange = (e) => {
        const {name, value} = e.target;
        setStudent((prevValue) => ({
            ...prevValue, 
            [name]: value
        }))
    }

    // a function to handle the form submission 
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent the defualt behaviour of the form submission

        try {
            const res = await fetch("https://batch28-fsd-be.onrender.com/students", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(student)
            });

            if(res.ok){
                await res.json(); 

                // clear form
                setStudent({
                    name: "",
                    age: "",
                    course: ""
                })
            } else {
                console.log("faild to submit")
            }

        } catch(error){
            console.log("error")
        }
    }

    return (
        <>
           <form onSubmit={handleSubmit} className="student-form">
            
            <input 
                type="text"
                placeholder="Please enter your name"
                value={student.name}
                name = "name"
                required
                onChange={handleChange}
            />

             <input 
                type="number"
                placeholder="Please enter your Age"
                value={student.age}
                name = "age"
                required
                onChange={handleChange}
            />


             <input 
                type="text"
                placeholder="Please enter your course name"
                value={student.course}
                name = "course"
                required
                onChange={handleChange}
            />

            <button type="submit">Submit</button>

           </form>
        </>
    )

}

export default StudentForm