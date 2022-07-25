import Head from "next/head"
import Styles from "./login.module.css"
import Link from "next/link"
import {useForm} from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
    const { register, handleSubmit, errors } = useForm();
  
    const onSubmit = async (data) => {
      const { email, password } = data;
      const res = await axios
        .post("https://fsw6-group4-staging.herokuapp.com/api/v1/users/login", {
          email,
          password,
        })
        .then((val) => {
          toast.success("Login Success", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
  
          window.localStorage.setItem("token", val.data.data.token);
          window.localStorage.setItem("id", val.data.data.secureuser.id);
          window.localStorage.setItem(
            "user",
            JSON.stringify(val.data.data.secureuser)
          );
          console.log(val.data.data.user);
          router.push({ pathname: "/" });
        })
        .catch((err) => {
          toast.error("Invalid Email or Password", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    };

    
    return(
        <div className={Styles.container}>
            <Head>
                <title>SecondHand. | Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>      
            <Toaster/>          
                <div className={Styles.card}>
                    <div className={Styles.judul}>
                        <h1>SecondHand.</h1>
                    </div>

                    <div className={Styles.form}>
                        <form action="/login" onSubmit={handleSubmit(onSubmit)} method="POST">
                            <div className={Styles.box}>
                                <div className={Styles.header}>
                                    <Link href="/login">
                                        <h2 align="center">LOGIN</h2>
                                    </Link>
                                </div>

                                <div className={Styles.email} align="center">
                                    <label htmlFor="Email" className={Styles.form_label}>E-mail</label><br></br>
                                    <input type="text" className={Styles.form_control} name="Email" id="Email" placeholder="Masukkan Email Anda" {...register("email")} required></input>
                                </div>

                                <br>
                                </br>

                                <div className={Styles.password} align="center">
                                    <label htmlFor="password" className={Styles.form_label}>Password</label><br></br>
                                    <input type="password" className={Styles.form_control} name="password" id="password" placeholder="Masukkan Password Anda" {...register("password")} required></input>
                                </div>
                                <br></br>
                                <div className={Styles.button} align="center">
                                    <input type="submit" className={Styles.button1} name="submit" value="Masuk"></input>
                                </div>
                            </div>
                        </form>
                            <div className={Styles.box}> 
                                <div className={Styles.page} align="center">
                                    <p>Belum Memiliki Akun?</p>
                                    <div className={Styles.link}>
                                        <Link href="/register"><a>Register Disini</a></Link>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>    
        </div>
    )
}