import { ModalComponent, useModal } from "../components/Modal"
import { createUser, deleteUser, getTotalUser, getUser, updateUser } from "../services/User"
// Table Component
import { useEffect, useState } from "react"

import { modalControlState } from "../Context/ModalState"
import { useDebounce } from "@uidotdev/usehooks"
import { useSetRecoilState } from "recoil"
import { userModalState } from "../Context/ModalState"

export default function Table() {
  // using pagination
  const setUser = useSetRecoilState(userModalState)
  const setModalStatus = useSetRecoilState(modalControlState)
  const [listUser, setListUser] = useState([])
  const [searchTxt, setSearch] = useState("")
  // current page
  const [page, setPage] = useState(1)
  const [allPage, setAllPage] = useState(1)

  const [pageSize, setPageSize] = useState(10)
  const [userTotal, setUserTotal] = useState(0)
  const { openModal } = useModal()
  const debouncedSearchTerm = useDebounce(searchTxt, 500)
  const [trigger, setTrigger] = useState(false)
  const [listPage, setListPage] = useState([1])

  const nextPage = () => {
    if (page !== allPage) setPage(page + 1)
  }
  const prevPage = () => {
    if (page !== 1) setPage(page - 1)
  }

  useEffect(() => {
    const getUserList = async () => {
      const skip = (page - 1) * pageSize
      const items = await getUser({ limit: pageSize, search: searchTxt, skip })
      const count = await getTotalUser({ search: searchTxt })
      const allPageTmp = Math.ceil(count / pageSize)
      const pageNumbers = [...Array(allPageTmp + 1).keys()].slice(1)
      setListPage(pageNumbers)

      setUserTotal(count)
      setListUser(items)
      // compute all page
      setAllPage(allPageTmp)
    }
    getUserList()
  }, [trigger, debouncedSearchTerm, pageSize, page])

  const buttonHandler = async ({ type = "create", user = {} }) => {
    switch (type) {
      case "delete": {
        setUser({ ...user })
        setModalStatus({
          state: type,
          fn: async () => {
            await deleteUser(user.id)
            setTrigger(!trigger)
          },
        })
        break
      }
      case "create": {
        setUser({})
        setModalStatus({
          state: type,
          fn: async user => {
            await createUser(user)
            setTrigger(!trigger)
          },
        })
        break
      }
      case "update": {
        setUser({ ...user })
        setModalStatus({
          state: type,
          fn: async user => {
            await updateUser(user)
            setTrigger(!trigger)
          },
        })
        break
      }
    }

    openModal()
  }

  return (
    <div>
      <div></div>
      <div className="flex max-w-sm">
        <div className="stat border border-solid">
          <div className="stat-title">Total User</div>
          <div className="stat-value">{userTotal}</div>
        </div>
      </div>
      <div className="divider"></div>
      <ModalComponent fn={() => {}}></ModalComponent>
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          default={searchTxt}
          onChange={e => {
            setSearch(e.target.value)
          }}
          className="input input-bordered w-24 md:w-auto my-2"
        />
      </div>
      <div className="flex flex-row my-2">
        <button
          className="btn btn-primary rounded-lg"
          onClick={() => buttonHandler({ type: "create" })}
        >
          Add User
        </button>
      </div>
      <div className="overflow-x-auto my-2">
        <table className="table border-collapse border">
          <thead>
            <tr className="text-lg text-center">
              <th>HN ID</th>
              <th>Name</th>
              <th>Telephone</th>
              <th>Email</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {(listUser || []).map(item => (
              <tr key={item.id} className="hover">
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.tel}</td>
                <td>{item.email}</td>
                <td className="flex items-center justify-center">
                  <button
                    className="btn btn-primary rounded-lg m-2"
                    onClick={() => {
                      buttonHandler({ type: "update", user: item })
                    }}
                  >
                    EDIT
                  </button>
                  <button
                    className="btn btn-secondary rounded-lg m-2"
                    onClick={() => {
                      buttonHandler({ type: "delete", user: item })
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-around">
        {/* Pagination */}
        <div className="join">
          <button className="join-item btn" onClick={() => setPage(1)}>
            FIRST Page
          </button>
          <button className="join-item btn" onClick={prevPage}>
            «
          </button>
          {listPage.map(item => {
            const className = `join-item btn ${item === page ? "btn-active" : ""}`
            return (
              <div
                key={item}
                className={className}
                {...(item !== page && { onClick: () => setPage(item) })}
              >
                {item}
              </div>
            )
          })}
          <button className="join-item btn" onClick={nextPage}>
            »
          </button>
          <button className="join-item btn" onClick={() => setPage(allPage)}>
            LAST Page
          </button>
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
            <option>3</option>
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
