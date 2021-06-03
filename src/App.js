import { useState } from 'react';
import { Container, Button, Form, ListGroup, Col, Row } from 'react-bootstrap';
import QRcode from 'qrcode.react';


function App() {
  const [activeCode, setActiveCode] = useState("");
  const [codeArray, setCodeList] = useState([]);
  const [codes, setCodes] = useState("");
  const [delay, setDelay] = useState(1);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const [activeI, setActiveI] = useState("");

  const formatCodes = (codeStr) => {
    setCodes(codeStr);
    const arr = codeStr.split("\n").filter(v => v);
    console.log(arr);
    setCodeList(arr);
  }

  const startCycle = () => {
    let index = 0;
    const interval = setInterval(() => {
      console.log({index, len: codeArray.length})
      if (index >= codeArray.length) {
        clearInterval(interval);
        setActiveI("");
        return;
      }
      setActiveI(index);
      setActiveCode(codeArray[index]);
      index += 1;

    }, delay * 1000);

  }

  return (
    <Container >
      <Col>
      <Row>
        <div style={{padding:'1rem'}}>
        <QRcode value={activeCode}></QRcode>
        </div>
        {activeI}
      </Row>
        <Row>
          <Form.Control
            type="number"
            placeholder="Delay (seconds)"
            onChange={e => setDelay(e.target.value)}
            value={delay}
          />
        </Row>
        <Row>
          <Button variant="primary" onClick={startCycle} style={{width:'100%'}}>Go!</Button>
        </Row>
        <Row>
            <Form.Control
              as="textarea"
              placeholder="Codes"
              style={{ height: "400px" }}
              value={codes}
              onChange={e => formatCodes(e.target.value)}
            />
        </Row>
        <Row>
          <ListGroup>
            {codeArray.map((code, i) => (<ListGroup.Item key={i} >{code}</ListGroup.Item>))}
          </ListGroup>
        </Row>
      </Col>
    </Container>
  );
}

export default App;
