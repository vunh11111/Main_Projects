const cards = [
    {
      title: "Mua hàng",
      subtitle: "Số lượng mua hàng",
      value: "17,663",
      trend: "Giảm 2%",
      className: "danger",
    },
    {
      title: "Hủy đơn",
      subtitle: "Giá trị của đơn hàng bị hủy",
      value: "$4,523.11",
      trend: "Bị hủy ít hơn 10%",
      className: "success",
    },
    {
      title: "Khách hàng",
      subtitle: "Số lượng khách hàng đặt hàng",
      value: "46,085",
      trend: "ít hơn 2% số lượng khách truy cập",
      className: "yellow",
    },
  ];
  
  export default function Cards() {
    return (
      <div className="cards">
        {cards.map((card, idx) => (
          <div key={idx} className="card-single">
            <div className="card-flex">
              <div className="card-info">
                <div className="card-head">
                  <span>{card.title}</span>
                  <small>{card.subtitle}</small>
                </div>
                <h2>{card.value}</h2>
                <small>{card.trend}</small>
              </div>
              <div className={`card-chart ${card.className}`}>
                <span className="las la-chart-line"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  