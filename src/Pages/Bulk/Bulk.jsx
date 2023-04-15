import React, { useState, useEffect, useRef } from "react"
import styles from "./Bulk.module.css"
import { v4 as uuidv4 } from "uuid"
import { Link } from "react-router-dom"
import BuildNShip from "/BuildNShip.png"
import { FaInstagram, FaTwitter, FaGithub, FaTelegram } from "react-icons/fa"
import { useToast } from "@chakra-ui/react"

const UuidGenerator = () => {
  const [input, setInput] = useState("")
  const [uuids, setUuids] = useState([])
  const [uuidsCopy, setUuidsCopy] = useState([])

  const checkboxRefNL = useRef(null)
  const checkboxRefCS = useRef(null)
  const checkboxRefDQ = useRef(null)

  const [checkboxState, setCheckboxState] = useState({
    nextLine: true,
    commaSeparated: false,
    doubleQuotes: false,
  })

  useEffect(() => {
    checkboxRefNL.current.checked = true
  }, [checkboxRefNL])

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
  }, [checkboxRefNL, checkboxRefCS, checkboxRefDQ])

  const handleJSONDownload = () => {
    const jsonData = JSON.stringify(uuids)

    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.download = `idfy-${uuids.length}.json`
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  function handleCSVDownload() {
    const csvData = uuids.map((item) => [item].join(",")).join("\n")
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.download = `idfy-${uuids.length}.csv`
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleChecboxChange = (e) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      nextLine: checkboxRefNL.current.checked,
      commaSeparated: checkboxRefCS.current.checked,
      doubleQuotes: checkboxRefDQ.current.checked,
    }))

    if (uuids.length === 0) {
      toast.closeAll()
      toast({
        title: `Add UUIDs to update structure.`,
        variant: "toast",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      })
    } else {
      toast.closeAll()
      toast({
        title: `UUIDs Strucuture Updated!`,
        variant: "toast",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      })
    }

    if (checkboxRefDQ.current.checked) {
      setUuidsCopy(
        uuids.map(
          (uuid, index) =>
            `"${uuid}"${
              checkboxRefCS.current.checked && index !== uuids.length - 1
                ? ","
                : ""
            } `
        )
      )
    } else {
      setUuidsCopy(
        uuids.map(
          (uuid, index) =>
            `${uuid}${
              checkboxRefCS.current.checked && index !== uuids.length - 1
                ? ","
                : ""
            } `
        )
      )
    }
  }

  const toast = useToast()

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
                    <span className={styles.uuid}>{uuid} </span>
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
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (input > 0) {
                    toast.closeAll()
                    toast({
                      title: `${input} UUIDs generated.`,
                      variant: "toast",
                      position: "top-right",
                      duration: 1000,
                      isClosable: true,
                    })
                    generateUuids(input)
                  } else {
                    toast.closeAll()
                    toast({
                      title: `Please enter a valid number.`,
                      variant: "toast",
                      position: "top-right",
                      duration: 1000,
                      isClosable: true,
                    })
                  }
                }
              }}
              placeholder="Enter number of UUIDs to generate"
            />
            <button
              onClick={() => {
                if (input > 0) {
                  toast.closeAll()
                  toast({
                    title: `${input} UUIDs generated.`,
                    variant: "toast",
                    position: "top-right",
                    duration: 1000,
                    isClosable: true,
                  })
                  generateUuids(input)
                } else {
                  toast.closeAll()
                  toast({
                    title: `Please enter a valid number.`,
                    variant: "toast",
                    position: "top-right",
                    duration: 1000,
                    isClosable: true,
                  })
                }
              }}
              className={styles.button}
            >
              Generate
            </button>
            <button
              onClick={() => {
                if (uuids.length > 0) {
                  navigator.clipboard.writeText(
                    uuidsCopy.join(checkboxState.nextLine ? "\r\n" : " ")
                  )
                  toast.closeAll()
                  toast({
                    title: `Generated UUIDs Copied.`,
                    variant: "toast",
                    position: "top-right",
                    duration: 1000,
                    isClosable: true,
                  })
                } else {
                  toast.closeAll()
                  toast({
                    title: `No UUIDs to copy.`,
                    variant: "toast",
                    position: "top-right",
                    duration: 1000,
                    isClosable: true,
                  })
                }
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
          <div>
            <button
              className={styles.download_button}
              onClick={() => {
                if (uuids.length > 0) {
                  handleJSONDownload()
                } else {
                  toast.closeAll()
                  toast({
                    title: `No UUIDs to download.`,
                    variant: "toast",
                    position: "top-right",
                    duration: 1000,
                    isClosable: true,
                  })
                }
              }}
            >
              Download JSON
            </button>
            <button
              className={styles.download_button}
              onClick={() => {
                if (uuids.length > 0) {
                  handleCSVDownload()
                } else {
                  toast.closeAll()
                  toast({
                    title: `No UUIDs to download.`,
                    variant: "toast",
                    position: "top-right",
                    duration: 1000,
                    isClosable: true,
                  })
                }
              }}
            >
              Download CSV
            </button>
            <button
              className={styles.clear_button}
              onClick={() => {
                if (uuids.length > 0) {
                  toast({
                    title: `All UUIDs cleared.`,
                    variant: "toast",
                    position: "top-right",
                    duration: 1000,
                    isClosable: true,
                  })
                  setUuidsCopy([])
                  setUuids([])
                  setInput("")
                } else {
                  toast.closeAll()
                  toast({
                    title: `No UUIDs to clear`,
                    variant: "toast",
                    position: "top-right",
                    duration: 1000,
                    isClosable: true,
                  })
                }
              }}
            >
              Clear All
            </button>
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
