import styles from './NavBar.module.css';
export default function NavBar(){

    return(
        <>
        <div className= {styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src="https://stalwart-wisp-382f3c.netlify.app/assets/logo.png" alt="Mav img"></img>
                <span>PhotoFolio</span>
            </div>
        </div>
        </>
    )
}

