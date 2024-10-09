const Widget = ({ icon: Icon, title, value }) => (
    <div className="flex flex-row bg-[#243325] p-4 rounded-lg shadow text-white">
      <div className="ml-4">
        <Icon size={35} />
      </div>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-3xl">{value}</p>
      </div>
    </div>
  );

  export default Widget;
