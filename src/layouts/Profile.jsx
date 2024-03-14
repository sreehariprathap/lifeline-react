import { UserAuth } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = UserAuth();

  return (
    <div className="p-10 flex flex-col gap-3">
      <h1 className="text-5xl font-thin">Hello, Sreehari Prathap</h1>
      <div className="flex p-10 justify-center items-center">
        <div className="avatar">
          <div className="w-52 rounded-full ring ring-primary-color ring-offset-base-100 ring-offset-2">
            <img src={user ? user.photoURL : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
