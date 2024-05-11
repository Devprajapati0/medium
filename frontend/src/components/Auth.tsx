
import React, {  useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import { signupInput } from "@devprajapati/medium"
import axios from "axios"
interface prop {
    type: "signup" | "signin"
}

function Auth({ type }: prop) {

    const navigate = useNavigate()

    const [postInputs, setpostInputs] = useState<signupInput>({
        name: '',
        email: '',
        password: ''
    })

    function handlechange(e: React.ChangeEvent<HTMLInputElement>) {
        setpostInputs((prev) => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

   async function signupapi(){
        try {
           const response = await axios.post(` https://medium.devprajapati742.workers.dev/api/v1/users/${type === 'signup' ? 'signup' : 'signin'}`,postInputs)
           console.log("response",response)
           console.log("response.data",response.data)
           console.log("response.data.token",response.data.token)
           const token = response.data.token;
           localStorage.setItem('token',token)
           navigate('/')
        } catch (error) {
            alert(`problem while ${type === 'signup' ? 'signup' :'signin'}`)
        }
    }

    return (
        <div className="bg-white h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div>
                    <div className="font-bold text-3xl">
                        Create An Account
                    </div>
                    <div className="">
                        { type === 'signin'? "Don't havean Account" : 'Already have an Account'}
                        <Link className="underline p-2" to={type === 'signup' ?'/signin' : '/signup'}>
                        {type === 'signin' ? 'signup' : 'signin'}
                        </Link>
                    </div>
                    <div>
                        <div>
                            {type === 'signup' ?
                            <Input name={'name'} onChange={handlechange} placeholder={"Enter your name"} label={"Name"} /> : null}
                            <Input name={'email'} onChange={handlechange} placeholder={"Enter your email.."} label={"Email"} />
                            <Input name={'password'} type="password" onChange={handlechange} placeholder={"Enter your password"} label={"Password"} />
                        </div>
                    </div>
                    <div className="pt-2">
                        <button onClick={signupapi} className=" bg-black w-full  hover:bg-transparent text-white font-semibold hover:text-black py-2 px-4 border border-black hover:border-black rounded" > {type === 'signin' ? 'signin' : 'signup'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface props {
    label: string,
    type?: string,
    placeholder: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ name, label, type = "text", placeholder, onChange }: props) {
    return (
        <div className="pb-2">
            <div className="block mb-2 text-sm font-medium text-black ">
                {label}
            </div>
            <div>
                <input name={name} className="bg-gray-100 border border-r-2 border-black text-gray-900 text-sm rounded-lg  block w-full p-2.5 " type={type} placeholder={placeholder} onChange={onChange} />
            </div>
        </div>
    )
}

export default Auth