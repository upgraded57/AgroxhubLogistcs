export const AvatarComp = ({ user }: { user?: User }) => {
  const intitials = user?.name.split(" ");
  const firstInitials = intitials?.[0][0] || "";
  const secondInitials = intitials?.[1][0] || "";
  return user?.avatar ? (
    <div className="avatar">
      <div className="w-10 rounded-full">
        <img src={user?.avatar} />
      </div>
    </div>
  ) : (
    <div className="avatar avatar-placeholder">
      <div className="bg-dark-green-clr text-white w-10 rounded-full">
        <span className="text-lg">{firstInitials + secondInitials}</span>
      </div>
    </div>
  );
};
