import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const CreateVotes = ({ contract }) => {

    const [uri, setUri] = useState("");
    const [options, setOptions] = useState(2);
    const [endDate, setEndDate] = useState("");

    return (
        <div>
            <p>Create vote page</p>
        </div>
    );
};

export default CreateVotes;
