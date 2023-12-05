# Front-End Training

1. Nghiên cứu về HTML/CSS
- Media query
- Flexbox
- Grid

2. Nghiên cứu về JavaScript
- DOM Manipulation
- Hoisting
- Event Bubbling
- Scope
- Prototype
- Shadow DOM
- IIFE
- Fetch API (fetch, Promise, async/await)
- Pure function
- Currying function
- Compose function

3. Nghiên cứu về Typescript
- Data Types x
- Classes x
- Decorators
- Access Modifiers and Properties x
- Static and Instance Members x
- Function Overloading x (same name, different type of parameters, return type)
- Constructors x
- Inheritance x
- Interfaces x
- Modules x (export/import)

4. So sánh Typescript và Javascript

5. Nghiên cứu về ReactJS
- State, props
- React hook
- Lifecycle (The lifecycle of an Effect)
- Context/ reducer
- Refs
- Higher Order Components
- React APIs

6. Tìm hiểu về ANTD: https://ant.design


6. Nghiên cứu về NextJS: https://nextjs.org

7. Sử dụng NextJS + Antd để dựng UI một trang Booking Hotel dạng Marketplace

- Đối tượng user:

  - Provider: Cho phép đăng hotel để cho Client thuê
  - Client: Người thuê hotel
  - Admin: Người quản lí chợ

- Yêu cầu:
  - Giao diện đăng ký/đăng nhập
  
  - Giao diện Client
    - Xem list/filter có trạng thái là APPROVED.
    - Xem chi tiết Hotel, có book Hotel ở chi tiết.
    - Xem list/filter Booked Hotel.
    - Xem chi tiết Booked Hotel.x

  - Giao diện Provider (dashboard)
    - Tạo hotel
    - Xem list/filter Hotel, có chỉnh sửa thông tin khi Hotel đang ở trạng thái DRAFT.
    - Xem chi tiết Hotel, có thể Submit Hotel, khi Submit Hotel trạng thái sẽ chuyển thành SUBMITED và không cho chỉnh sửa.
    - Xem list/filter Booked Hotel.
    - Xem chi tiết Booked Hotel. x

  - Giao diện Admin (dashboard)
    - Xem list/filter Hotel do Provider tạo. Có thể chỉnh sửa Hotel khi đang ở trạng thái SUBMITED. 
    - Xem chi tiết Hotel. Có thể approve Hotel, lúc này trạng thái sẽ chuyển thành APPROVED.
    - Xem list/filter Booked Hotel
    - Xem chi tiết Booked Hotel.x

- Yêu cầu về code
  - Sử dụng TypeScript và hạn chế dùng any
  - Chia nhỏ component
  - Có custom hook
  - Có responsive
  - 

- Khác
  - Chỉ cần dùng UI sẵn có của antd