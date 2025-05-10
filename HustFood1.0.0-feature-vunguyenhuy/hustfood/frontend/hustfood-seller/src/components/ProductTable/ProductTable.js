const products = [
    {
      name: "Cơm gà",
      price: "45.000đ",
      type: "Món gà rán",
      time: "Đăng 6 ngày trước",
      even: false,
    },
    {
      name: "Cơm gà rán",
      price: "45.000đ",
      type: "Món gà rán",
      time: "Đăng 6 ngày trước",
      even: true,
    },
    {
      name: "Cơm phi lê gà",
      price: "45.000đ",
      type: "Món gà rán",
      time: "Đăng 6 ngày trước",
      even: false,
    },
    {
      name: "Gà viên",
      price: "30.000đ",
      type: "Món gà rán",
      time: "Đăng 6 ngày trước",
      even: true,
    },
  ];
  
  export default function ProductTable() {
    return (
      <div className="jobs">
        <h2>
          Sản Phẩm{" "}
          <small>
            Xem tất cả sản phẩm <span className="las la-arrow-right"></span>
          </small>
        </h2>
        <div className="table-responsive">
          <table width="100%">
            <tbody>
              {products.map((product, idx) => (
                <tr key={idx}>
                  <td>
                    <div>
                      <span
                        className={`indicator ${product.even ? "even" : ""}`}
                      ></span>
                    </div>
                  </td>
                  <td>
                    <div>{product.name}</div>
                  </td>
                  <td>
                    <div>{product.price}</div>
                  </td>
                  <td>
                    <div>{product.type}</div>
                  </td>
                  <td>
                    <div>{product.time}</div>
                  </td>
                  <td>
                    <div>
                      <button>Xem thêm</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  