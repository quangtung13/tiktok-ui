import { useParams } from 'react-router-dom';

function Profile() {
    const { nickname } = useParams(); // Lấy giá trị từ URL

    return (
        <div>
            <h1>Profile of {nickname}</h1>
            {/* Hiển thị thêm thông tin người dùng nếu cần */}
        </div>
    );
}

export default Profile;
