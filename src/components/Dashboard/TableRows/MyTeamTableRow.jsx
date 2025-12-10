import { format } from "date-fns";

const MyTeamTableRow = ({ member, index }) => {
  const { name, email, photo, position, upcomingBirthday } = member;

  const currentMonth = new Date().getMonth();

  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={photo} alt={name} />
              </div>
            </div>
            <div>
              <div className="font-bold">{name}</div>
              <div className="text-sm opacity-50">{email}</div>
            </div>
          </div>
        </td>
        <td>{position}</td>
        <td>
          {new Date(upcomingBirthday).getMonth() === currentMonth &&
            format(new Date(upcomingBirthday), "MMM d")}
        </td>
      </tr>
    </>
  );
};

export default MyTeamTableRow;
