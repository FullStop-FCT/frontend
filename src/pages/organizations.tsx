import Orgs from '../Components/OrgCards';



export default function Organizations() {

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
    document.head.appendChild(styleLink);


    return (<Orgs/>)
}