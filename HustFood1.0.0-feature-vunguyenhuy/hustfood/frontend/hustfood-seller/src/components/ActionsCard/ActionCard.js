export default function ActionsCard() {
    return (
      <div className="analytics-card">
        <div className="analytics-head">
          <h3>Các hành động cần thực hiện</h3>
          <span className="las la-ellipsis-h"></span>
        </div>
        <div className="analytics-chart">
          <div className="chart-circle">
            <h1>74%</h1>
          </div>
          <div className="analytics-note">
            <small>
              Lưu ý: Sprint hiện tại cần một cuộc họp với các bên liên quan để đi
              đến kết luận.
            </small>
          </div>
        </div>
        <div className="analytics-btn">
          <button>Tạo báo cáo</button>
        </div>
      </div>
    );
  }
  