import { useRecoilValue } from "recoil"
import { userState } from "../Context/UserContext"

export default function Div() {
  const user = useRecoilValue(userState)

  return <div> ID = {user.id}</div>
}
