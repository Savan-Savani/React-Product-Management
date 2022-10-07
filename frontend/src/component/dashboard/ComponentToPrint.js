import React, { useRef } from "react";
import "../../css/componenttoprint.css"
import { Button, Form, Input, Popconfirm, Select, Table } from 'antd';
import logo from"../../image/logo1.png"


class ComponentToPrint extends React.Component {
    render() {
        return (
            <div >
                <div>
                    <div className="bill_body" >
                        <header className="clearfix">
                            <div id="logo">
                                <img src={logo} />
                            </div>
                            <h1>MANAKI ENTERPRISE</h1>

                            <div id="company" >
                                <div>Manaki Enterprise </div>
                                <div> 796 Silver Harbour,<br /> TX 79273, US</div>
                                <div>9999999999 </div>
                                <div><a href="mailto:john@example.com">john@example.com</a></div>

                            </div>
                            <div id="project" className="clearfix" >
                                <div><span>Client name :</span>{this.props.finishValue[0].companyname}</div>
                                <div><span>Address :</span>{this.props.finishValue[0].address}</div>
                                {/* <div><span>GST NO. :</span>{this.props.finishValue[0].gstnumber}</div> */}
                                <div><span>Mobile NO. :</span>{this.props.finishValue[0].mobilenumber}</div>
                                <div><span>DATE :</span></div>
                                <div><span>Invoice No. :</span></div>
                            </div>
                        </header>
                        <main>
                            <table >
                                <thead>
                                    <tr>
                                        <th className="service">Product</th>
                                        <th className="desc">price per unit</th>
                                        <th>units</th>
                                        <th>total</th>
                                        <th>grand total</th>

                                    </tr>
                                </thead>
                                <tbody className="body_table">
                                    {/* <tr>
                                        {this.props.dataSource.map((key, index) => {
                                            return (
                                                <div>
                                                    <tr>
                                                        <td className="service">{key.item}</td>
                                                        <td className="desc">{key.ppu}</td>
                                                        <td className="unit">{key.units}</td>
                                                        <td className="qty">{key.ppu * key.units}</td>
                                                    </tr>
                                                </div>
                                            )
                                        })}
                                    </tr> */}
                                    {
                                        this.props.dataSource.map((e) => {
                                            return (
                                                <tr>
                                                    <td className="service">Development</td>
                                                    <td className="desc"> a Content Management System-based Website</td>
                                                    <td className="unit">{e.units}</td>
                                                    <td className="qty">{e.ppu}</td>
                                                    <td className="total">{e.ppu * e.units}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {/* <tr>
                                        <td className="service">SEO</td>
                                        <td className="desc">Optimize the site for search engines (SEO)</td>
                                        <td className="unit">$40.00</td>
                                        <td className="qty">20</td>
                                        <td className="total">$800.00</td>
                                    </tr>
                                    <tr>
                                        <td className="service">Training</td>
                                        <td className="desc">Initial training sessions for staff responsible for uploading web content</td>
                                        <td className="unit">$40.00</td>
                                        <td className="qty">4</td>
                                        <td className="total">$160.00</td>
                                    </tr> */}
                                    <tr>
                                        <td colspan="4">SUBTOTAL</td>
                                        <td className="total">$5,200.00</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">TAX 25%</td>
                                        <td className="total">$1,300.00</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" className="grand total">GRAND TOTAL</td>
                                        <td className="grand total">$6,500.00</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div id="notices">
                                <div>NOTICE:</div>
                                <div className="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div>
                            </div>
                        </main>
                        <footer>
                            Invoice was created on a computer and is valid without the signature and seal.
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}
export default ComponentToPrint