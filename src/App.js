import { useState } from 'react';
import { Container, Button, Form, ListGroup, Col, Row } from 'react-bootstrap';
import QRcode from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    let index = activeI || 0;
    setActiveI(index);
    setButtonEnabled(false);
    window.countInterval = setInterval(() => {
      console.log({ index, len: codeArray.length })
      setActiveCode(codeArray[index]);
      index += 1;
      setActiveI(index);
      if (index >= codeArray.length) {
        stopInterval();
        setActiveI("");
        return;
      }
      if ((index + 1) % 10 === 0) {
        stopInterval();
        return;
      }
    }, delay * 1000);
  }

  const stopInterval = () => {
    clearInterval(window.countInterval);
    setButtonEnabled(true);
  }

  return (
    <Container >
      <Col>
        <Row>
          <div style={{ padding: '1rem' }}>
            <QRcode value={activeCode}></QRcode>
          </div>
          {activeI === "" ? "" : activeI + 1 }
          {activeI > 0 && <Button variant="warning" onClick={() => setActiveI("")}>Reset</Button>}
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
          {buttonEnabled ? (
            <Button variant="primary" onClick={startCycle} style={{ width: '100%' }}>Go!</Button>
          ) : (
            <Button variant="danger" onClick={stopInterval} style={{ width: '100%' }}>Stop</Button>
          )}
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
