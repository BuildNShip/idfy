import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./Home.module.css"
import { v4 as uuid } from "uuid"
import { FiCopy } from "react-icons/fi"
import { useToast } from "@chakra-ui/react"
import BuildNShip from "/BuildNShip.png"
import { FaInstagram, FaTwitter, FaGithub, FaTelegram } from "react-icons/fa"

const Home = () => {
  const [id, setId] = useState("")
  const toast = useToast()

  useEffect(() => {
    const unique_id = uuid()
    setId(unique_id)
  }, [])

  return (
    <div className={styles.background_container}>
      <div className={styles.main_container}>
        <div className={styles.navbar_header}>
          {/* <p className={styles.brand_text}>IDfy</p> */}
        </div>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <p className={styles.first_view_heading}>
              Generate Unique UUID with Ease For Your App using{" "}
              <span>IDfy</span>.
            </p>
            <p className={styles.first_view_tagline}>
              IDfy is a simple and easy to use tool that generates unique ID for
              your app.
            </p>

            <div className={styles.first_view_uuid}>
              <p className={styles.first_view_uuid_heading}>{id}</p>
              <FiCopy
                className={styles.first_view_uuid_icon}
                size={32}
                onClick={() => {
                  toast({
                    title: "UUID Copied.",
                    description: "Your UUID has been copied to your clipboard.",
                    status: "success",
                    position: "top-right",
                    duration: 3000,
                    isClosable: true,
                  })
                  navigator.clipboard.writeText(id)
                  setId(unique_id)
                }}
              />
            </div>

            <div className={styles.first_view_button_container}>
              <button
                className={styles.first_view_button_one}
                onClick={() => {
                  navigator.clipboard.writeText(id)
                  const unique_id = uuid()
                  setId(unique_id)
                  toast({
                    title: "UUID Copied and Generated.",
                    description:
                      "Your UUID has been copied to your clipboard and a new UUID has been generated.",
                    status: "success",
                    position: "top-right",
                    duration: 1000,
                    isClosable: true,
                    bg: "#ecba00",
                  })
                }}
              >
                Copy and Generate
              </button>
              <button
                className={styles.first_view_button}
                onClick={() => {
                  const unique_id = uuid()
                  setId(unique_id)
                  toast({
                    title: "UUID Generated.",
                    description: "A new UUID has been generated.",
                    status: "success",
                    position: "top-right",
                    duration: 1000,
                    isClosable: true,
                    bg: "#ecba00",
                  })
                }}
              >
                Generate New
              </button>
            </div>
            <p className={styles.bulk_view}>
              Do you want to generate buik UUIDs?{" "}

              <Link to="/bulk"><span>Click Here!</span></Link>
            </p>
          </div>
        </div>
        <div className={styles.footer}>
          <a href="https://buildnship.in/">
            <img src={BuildNShip} alt="logo" />
          </a>
          <div className={styles.social_container}>
            <a href="https://twitter.com/buildnship/">
              <FaTwitter size={25} />
            </a>
            <a href="https://instagram.com/buildnship?igshid=YmMyMTA2M2Y=">
              <FaInstagram size={25} />
            </a>
            <a href="https://github.com/BuildNShip">
              <FaGithub size={25} />
            </a>
            <a href="https://t.me/buildnship">
              <FaTelegram size={25} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
