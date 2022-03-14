import { useState } from 'react'
import { Button, Form, FormGroup, Alert, Input } from 'reactstrap';
import styled from 'styled-components'
import { AiOutlineCopy } from 'react-icons/ai';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { validURL } from '../utils/checkURL'

const Shortener = () => {

  const [link, setLink] = useState("")
  const [result, setResult] = useState("")

  const StyledAlert = styled(Alert)`
    width: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
  `;

  const StyledButton = styled(Button)`
    margin-left: 10px;
    padding-top: -10px;
  `;

  const shortenLink = async () => {
    console.log(link)
    if (!validURL(link)) {
      alert("Invalid URL!")
      setLink("")
    } else {
      await fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 12824ec323d6ad462f300b661821127e064fecc0',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "long_url": link, "domain": "bit.ly", "group_guid": "Bl9hb7gDsWp" })
      })
        .then((res) => res.json())
        .then((data) => setResult(data.id));
    }

  }

  return (
    <div>
      <h1 className="d-flex justify-content-center">Your link shortener</h1>
      <Form className="d-flex justify-content-center pt-3">
        <FormGroup className="mr-2">
          <Input value={link} onChange={(e) => {
            let newLink: string = (e.target.value.indexOf('://') === -1) ? 'http://' + e.target.value : e.target.value
            setLink(newLink)
          }} type="text" name="link" id="linkInput" placeholder="Input your link" />
        </FormGroup>
        <Button className="ml-2" color="primary" onClick={() => {
          shortenLink()
        }}>Shorten!</Button>
      </Form>
      <div>
        {result === ""
          ?
          ""
          :
          <StyledAlert className="d-flex justify-content-center" color="primary">
            <div className="mr-3">Your link - {result}</div>
            <CopyToClipboard text={result}>
              <StyledButton className="ml-3" onClick={() => {
                alert('Copied!')
              }}>
                <AiOutlineCopy />
              </StyledButton>
            </CopyToClipboard>
          </StyledAlert>
        }
      </div>
    </div>
  )
}

export default Shortener
