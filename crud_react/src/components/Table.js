// Table Component
import React from "react"

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
                  <button className="btn">BTN</button>
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
      <div className="flex justify-around">
        <div className="join">
          <button className="join-item btn">«</button>
          <div className="join-item btn">1</div>
          <div className="join-item btn">2</div>
          <div className="join-item btn btn-disabled">...</div>
          <div className="join-item btn">4</div>
          <div className="join-item btn">5</div>
          <button className="join-item btn">»</button>
        </div>
        <div className="dropdown">
          <label tabIndex={0} className="btn">
            Page Size
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 1</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
