import React, { useEffect, useState } from "react";
import logo from "../SpinMain/LogoForm.png";
import qrcode from "./qrcode.png";
import sign from "../SpinMain/Sign.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constant";
import { Button, Modal } from "antd";
import ReactToPrint from "react-to-print";
const CertificateModal = ({ visible, onClose, userData }) => {

    const getCurrentDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const componentRef = React.useRef(null);
    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={1240}
            className="certificate-modal"
        >
            <div ref={componentRef} className="m-5 mr-5 ml-5 border-4 border-green-600 mx-auto p-5 rounded-lg bg-white shadow-md mt-5 ">
                <div className="text-center sm-text-md mb-5">
                    <div className="flex justify-between items-center mx-[7.5%]">
                        <div className="text-left">
                            <h1 className="text-2xl ml-[-4%] mb-2 font-bold">
                                2024 Verified Carbon Offset Certificate
                            </h1>
                            <hr className="border-t-4 border-D7E5BE w-[118%] ml-[-5%]" />
                        </div>
                        <img src={logo} alt="" className="h-25 mx-[-5%]" />
                    </div>
                </div>
                <div className="text-left mb-5 mx-[4.3%] sm-text-md">
                    <p className="ml-5 ">PRESENTED TO</p>
                    <h2 className="text-2xl font-bold ml-5 text-green-600 mb-5">
                        {`${userData?.firstName} ${userData?.lastName}`}
                    </h2>
                    <p className="ml-5">FOR OFFSETTING</p>
                    <h2 className="text-2xl font-bold ml-5 text-green-600">
                        {userData?.offSetValue} tCO<sub>2</sub>e
                    </h2>
                </div>
                <div className="text-left ml-[6%] mb-5 mr-[5%] text-lg sm-text-md">
                    <p>
                        Climate change and environmental protection are closely linked. Your
                        efforts to enhance the environment will create a significant and
                        long-term impact.
                        <br />
                    </p>
                    <p className="mt-3">
                        Fitsol deeply appreciates your dedication to taking decisive climate
                        action and for supporting the UN's Sustainable Development Goals.
                    </p>
                </div>
                <div className="text-left mb-5 ml-[5%] sm-text-md">
                    <div className="flex justify-end mr-[5%]">
                        <div className=" mr-5">
                            Date:
                            <br /> {getCurrentDate()}
                        </div>
                        <div className="mr-5 ml-5 ">
                            CEO Fitsol Signature
                            <br />
                            <img src={sign} alt="" className="ml-4 h-25 w-20" />
                            <br />
                        </div>
                        <div className="text-center mr-5 ml-5">
                            QR Code <br />
                            <img src={qrcode} alt="QR Code" className="w-20 h-20" />
                        </div>
                    </div>
                    <div className="mx-3 mb-0 ">
                        {/* <p>
            <b>Retirement ID</b>: {userData?.retirementId}
          </p> */}
                        <p>
                            <b>Standard:</b> {userData?.rStandard || "not defined"}
                        </p>
                        <p>
                            <b>Certificate Number:</b> {userData?.rCertificateNumber}
                        </p>
                    </div>
                </div>
                <div className="text-left mb-5 text-sm mx-[4.5%]">
                    <p className="mb-3 ml-5 mt-0">
                        Fitsol commits to retire the purchased carbon credits or certificates
                        in the relevant public registry in line with the highest International
                        carbon accounting and reporting standards. These credits are utilised
                        to offset the estimated carbon footprint of the beneficiary for the
                        year 2023-24
                    </p>
                    <hr className="border-t-4 border-D7E5BE w-full" />
                    <center>
                        <p className="text-sm ml-1">
                            This certificate is issued by Fitsol Supply Chain Solutions Private
                            Limited. For more information about our services and climate change
                            mitigation projects, please visit{" "}
                            <a href="https://www.Fitsol.green" className="text-blue-500">
                                https://fitsol.green.
                            </a>{" "}
                            The CO<sub>2</sub>e emissions indicated on the certificate are
                            compensated through investments in carbon offset projects based on
                            international standards.

                        </p>
                    </center>
                </div>
            </div>
            <ReactToPrint
                trigger={() => (
                    <button type="primary" 
                    className="px-4 py-2 my-2 bg-buttonColor text-black font-bold rounded hover:bg-hoveColor transition duration-300"
                    >
                        Print Certificate
                    </button>
                )}
                content={() => componentRef.current}
            />
        </Modal>
    );
};
const Certificate = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const userEmail = localStorage.getItem("email");
                if (!userEmail) {
                    localStorage.clear();
                    navigate("/");
                }
                const res = await axios.get(`${baseUrl}/spinnerFormData`, {
                    params: {
                        businessEmail: userEmail,
                    },
                });
                setUserData(res?.data?.userData);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const handleClose = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    🎉 Congratulations! 🎉
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                As a participant in our contest, you can claim your certificate recognizing your support for sustainable practices and environmental conservation. Please click on the link below to receive your well-deserved certificate.🌱🌍
                </p>
                <p className="text-lg text-green-800 font-bold">
                    We hope to see you again in future events!
                </p>
                <div className="flex justify-around mt-8">
                    <button
                        onClick={showModal}
                        className="w-max h-10 px-3 bg-buttonColor text-black font-bold rounded hover:bg-hoveColor transition duration-300"
                    >
                        Claim certificate
                    </button>
                    <button
                        onClick={handleClose}
                        className="w-max h-10 px-4 bg-buttonColor text-black font-bold rounded hover:bg-hoveColor transition duration-300"
                    >
                        return to home page
                    </button>
                </div>

            </div>
            <CertificateModal
                visible={isModalVisible}
                onClose={handleModalClose}
                userData={userData}
            />
        </div>)
};

export default Certificate;