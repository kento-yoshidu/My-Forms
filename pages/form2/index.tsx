import React, { useState } from "react"
import Head from "next/head"

import Container from "../../components/container"
import Header from "../../components/header"
import PageTitle from "../../components/pageTitle"
import HomeLink from "../../components/home-link"
import PageLink from "../../components/page-link"

import styles from "../form1/style.module.css"
import descStyles from "../../styles/description.module.css"
import Description from "../../components/description"

const Form2 = () => {
  const [name, setName] = useState("")
  const [convertedData, setConvertedData] = useState("")
  const [isInputInvalid, setIsInputInvalid] = useState(false)
  const [isClickable, setIsClickable] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)

    const trimmedName = e.target.value.trim()

    if (trimmedName.length > 0) {
      setIsClickable(true)
      setIsInputInvalid(false)
    } else {
      setIsClickable(false)
      setIsInputInvalid(true)
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = await fetch("/api/form1", {
      method: "POST",
      body: JSON.stringify(name),
      headers: { 'Content-Type': 'application/json' }
    })

    if (data.status === 200) {
      const result = await data.json()
      setConvertedData(result.name)
    }
  }

  return (
    <>
      <Head>
        <title>Form2 | My Forms</title>
      </Head>

      <Header />

      <PageTitle pageTitle="Form2" />

      <Container>
        <div className={styles.wrapper}>
          <h3 className={styles.title} data-testid="form-title">
            Form2
          </h3>

          <p className={styles.text}>あなたの名前を半角のアルファベットで入力し、「変換する」ボタンをクリックしてください。</p>
          <p className={styles.text}>小文字を大文字に変換して表示します。</p>

          <form className={styles.form} onSubmit={submit}>
            <label htmlFor="name" className={styles.label}>
              お名前 <span>※必須</span>
            </label>

            <input
              id="name"
              className={styles.input}
              type="text"
              onChange={handleChange}
              placeholder="Taro Yamada"
              data-testid="name"
              autoComplete="off"
              value={name}
            />

            {isInputInvalid && (
              <p className={styles.errorMessage} data-testid="error-message">文字が入力されていません</p>
            )}

            <button
              className={styles.button}
              data-testid="submit"
              type="submit"
              name="Sign Up"
              disabled={!isClickable}
            >
              変換する
            </button>
          </form>

          {convertedData && (
            <div className={styles.result} data-testid="result-area">
              <p>あなたの名前を大文字に変換しました！<br />{convertedData}</p>
            </div>
          )}
        </div>

        <Description>
          <p>Form2の構成はForm1とほとんど同じです。違う点は、テキストボックスに文字を入力した後で、文字を全て削除すると、「文字が入力されていません」というエラーメッセージが表示される点です。</p>

          <p>onChangeイベントハンドラーで入力された文字数をカウントし、0になった時にエラーメッセージのstateを変化させ表示させます。</p>

          <p>テストコードは<a href="https://github.com/kento-yoshidu/MyForms/blob/main/__tests__/form2.test.tsx">こちら</a>です。テストは、</p>

          <ol>
            <li>初回レンダリング時、変換結果が表示されるエリアに何も表示されていないこと</li>
            <li>初回レンダリング時、エラーメッセージが表示されていないこと</li>
            <li>テキストボックスに文字が入力されていない時、ボタンがdisabledになっていること</li>
            <li>テキストボックスに文字が入力されている時、ボタンがdisabledになっていないこと</li>
            <li>テキストボックスに文字を入力してから削除した時、エラーメッセージが表示されること</li>
            <li>フォームに名前を入力し送信ボタンをクリックした時、大文字になった名前が表示されること</li>
          </ol>

          <p>を行っています。</p>
        </Description>

        <PageLink prev="1" next="3" />

        <HomeLink />
      </Container>
    </>
  )
}

export default Form2
