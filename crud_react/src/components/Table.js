import { useSetRecoilState } from "recoil"
// Table Component
import { useState } from "react"
import { userState } from "../Context/UserContext"

const data = [
  {
    id: 1,
    name: "John",
    tel: "123456789",
    email: "bank@bank.com",
  },
  {
    id: 2,
    name: "John",
    tel: "123456789",
    email: "bank@bank.com",
  },
  {
    id: 3,
    name: "John",
    tel: "123456789",
    email: "bank@bank.com",
  },
  {
    id: 4,
    name: "John",
    tel: "123456789",
    email: "bank@bank.com",
  },
  {
    id: 5,
    name: "John",
    tel: "123456789",
    email: "bank@bank.com",
  },
]

export default function Table() {
  // using pagination
  const setUser = useSetRecoilState(userState)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  return (
    <div>
      <div className="form-control">
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto " />
      </div>
      <div className="overflow-x-auto mt-8">
        <table className="table border-collapse border">
          <thead>
            <tr className="text-lg text-center">
              <th>Operation</th>
              <th>HN ID</th>
              <th>Name</th>
              <th>Telephone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="hover">
                <td className="flex items-center justify-center">
                  <button
                    className="btn"
                    onClick={() => {
                      setUser({ ...item, updateState: true })
                    }}
                  >
                    BTN
                  </button>
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.tel}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-around">
        {/* Pagination */}
        <div className="join">
          <button className="join-item btn">«</button>
          <div className="join-item btn btn-active">1</div>
          <div className="join-item btn">2</div>
          <div className="join-item btn">3</div>
          <div className="join-item btn">4</div>
          <button className="join-item btn">»</button>
        </div>

        {/* Page Size */}
        <div className="form-control w-full max-w-xs flex flex-row">
          <label className="label">
            <span className="label-text-alt">Page Size</span>
          </label>
          <select
            className="select select-bordered"
            value={pageSize}
            onChange={e => setPageSize(e.target.value)}
          >
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
      </div>
    </div>
  )
}
