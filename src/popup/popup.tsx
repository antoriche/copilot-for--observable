import React, { useEffect } from "react";
import "./popup.css";
import * as storage from '../storage'

import { Form,Input } from "antd";

export default function Popup() {

  const [apiKey, setApiKey] = React.useState("")

  useEffect(() => {
    storage.get('apikey').then((key)=>{
      setApiKey(key||"")
    })
  }, []);

  return (
    <div className="popupContainer">
        <h2>Copilot for ObservableHQ</h2>
        <Form layout="vertical">
          <Form.Item label="OpenAI API Key">
          <Input
            value={apiKey}
            onChange={(e)=>{
              setApiKey(e.target.value)
              storage.set('apikey',e.target.value)
            }}
            type="text"
            id="apikey"
            name="apikey"
          />
          </Form.Item>
        </Form>
    </div>
  );
}
