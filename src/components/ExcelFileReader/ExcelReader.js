import React, { Component } from "react";
import XLSX from "xlsx";
import { make_cols } from "./MakeColumns";
import { SheetJSFT } from "./types";
import { Input, message } from "antd";
import axios from "axios";

export class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      batch: "",
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBatch = this.handleBatch.bind(this);
  }

  handleBatch(e) {
    this.setState({ batch: e.target.value });
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  }

  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws["!ref"]) }, async () => {
        console.log(this.state.data);
        console.log(this.state.batch);

        const key = "updatable";
        try {
          message.loading({ content: "Uploading Data...", key });
          const response = await axios.post(
            "http://localhost:5000/api/admin/addBatch",
            {
              batch: this.state.batch,
              alumniData: this.state.data,
            }
          );
          if (response.data === "The Batch Already Exists!") {
            message.success({ content: "The Batch Already Exists!", key });
          } else {
            message.success({ content: "Success!", key });
          }
        } catch {
          alert("Error");
        }
      });
    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
  }

  render() {
    return (
      <div style={{ width: "50vw" }}>
        <Input
          placeholder="Enter Batch Name"
          style={{ marginBottom: "1rem" }}
          onBlur={this.handleBatch}
        ></Input>
        <label htmlFor="file" style={{ marginBottom: "1rem" }}>
          Upload an excel to Process Triggers
        </label>
        <br />
        <br />
        <input
          type="file"
          className="form-control"
          id="file"
          accept={SheetJSFT}
          onChange={this.handleChange}
          style={{ marginBottom: "1rem" }}
        />
        <br />
        <input type="submit" value="Add Batch" onClick={this.handleFile} />
      </div>
    );
  }
}
