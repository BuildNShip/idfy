import React, { useState, useEffect, useRef } from "react"
import styles from "./Bulk.module.css"
import { v4 as uuidv4 } from "uuid"
import { Link } from "react-router-dom"
import BuildNShip from "/BuildNShip.png"
import { FaInstagram, FaTwitter, FaGithub, FaTelegram } from "react-icons/fa"

const UuidGenerator = () => {
  const [input, setInput] = useState("")
  const [uuids, setUuids] = useState([])
  const [uuidsCopy, setUuidsCopy] = useState([])

  const checkboxRefNL = useRef(null)
  const checkboxRefCS = useRef(null)
  const checkboxRefDQ = useRef(null)

  const [checkboxState, setCheckboxState] = useState({
    nextLine: false,
    commaSeparated: false,
    doubleQuotes: false,
  })

  const generateUuids = (count) => {
    const newUuids = Array.from({ length: count }, () => uuidv4())
    setUuids(newUuids)
    setUuidsCopy(newUuids)
  }

  useEffect(() => {
    setCheckboxState((prevState) => ({
      ...prevState,
      nextLine: checkboxRefNL.current.checked,
      commaSeparated: checkboxRefCS.current.checked,
      doubleQuotes: checkboxRefDQ.current.checked,
    }))
    console.log(checkboxState)
  }, [checkboxRefNL, checkboxRefCS, checkboxRefDQ])

  const handleChecboxChange = (e) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      nextLine: checkboxRefNL.current.checked,
      commaSeparated: checkboxRefCS.current.checked,
      doubleQuotes: checkboxRefDQ.current.checked,
    }))

    if (checkboxRefDQ.current.checked) {
      setUuidsCopy(
        uuids.map(
          (uuid, index) =>
            `"${uuid}" ${
              checkboxState.commaSeparated && index !== uuids.length - 1
                ? ","
                : ""
            }`
        )
      )
    } else {
      setUuidsCopy(
        uuids.map(
          (uuid, index) =>
            `${uuid} ${
              checkboxState.commaSeparated && index !== uuids.length - 1
                ? ","
                : ""
            }`
        )
      )
    }

    if (checkboxRefCS.current.checked) {
      setUuidsCopy(
        uuids.map((uuid, index) => {
          if (index !== uuids.length - 1) {
            return uuid + ","
          } else {
            return uuid
          }
        })
      )
    } else {
      setUuidsCopy(uuids)
    }

    if (checkboxRefNL.current.checked) {
      setUuidsCopy(
        uuids.map((uuid, index) => {
          if (index !== uuids.length - 1) {
            return uuid + "\n"
          } else {
            return uuid
          }
        })
      )
    } else {
      setUuidsCopy(uuids)
    }

    console.log(checkboxState)
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.background_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.display_uuids_container}>
              <div className={styles.display_uuids}>
                {uuidsCopy.map((uuid, index) =>
                  checkboxState.nextLine ? (
                    <p className={styles.uuid}>{uuid}</p>
                  ) : (
                    <span className={styles.uuid}>{uuid}</span>
                  )
                )}
              </div>
            </div>
          </div>
          <div className={styles.input_container}>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.input}
              placeholder="Enter number of UUIDs to generate"
            />
            <button
              onClick={() => {
                if (input > 0) {
                  generateUuids(input)
                }
              }}
              className={styles.button}
            >
              Generate
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(uuids.join("\r\n"))
                console.log(uuids.join("\r\n"))
              }}
              className={styles.button_secondary}
            >
              Copy UUIDs
            </button>
          </div>
          <div className={styles.check_boxes}>
            <div className={styles.checkbox_container}>
              <input
                className={styles.checkbox_input}
                type="checkbox"
                ref={checkboxRefNL}
                onClick={() => {
                  handleChecboxChange()
                }}
                name=""
                id=""
              />
              <p className={styles.checkbox_label}>Next Line</p>
            </div>
            <div className={styles.checkbox_container}>
              <input
                className={styles.checkbox_input}
                type="checkbox"
                ref={checkboxRefCS}
                onClick={() => {
                  handleChecboxChange()
                }}
                name=""
                id=""
              />
              <p className={styles.checkbox_label}>Comma Separated</p>
            </div>
            <div className={styles.checkbox_container}>
              <input
                className={styles.checkbox_input}
                type="checkbox"
                ref={checkboxRefDQ}
                onClick={() => {
                  handleChecboxChange()
                }}
                name=""
                id=""
              />
              <p className={styles.checkbox_label}>Double Quotes</p>
            </div>
          </div>
          <p className={styles.bulk_view}>
            Do you want to generate single UUID?{" "}
            <Link to="/">
              <span>Click Here!</span>
            </Link>
          </p>
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

export default UuidGenerator
