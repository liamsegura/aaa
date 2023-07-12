// pages/organizations/[id].ts
import { useState, useEffect } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import type {
  OrganizationMembershipResource,
  MembershipRole,
} from "@clerk/types";

// View and manage active organization members, along with any
// pending invitations.
// Invite new members.
export default function Organization() {
  const {
    organization: currentOrganization,
    membership,
    isLoaded,
  } = useOrganization();

  if (!isLoaded || !currentOrganization) {
    return null;
  }

  const isAdmin = membership?.role === "admin";
  return (
    <>
      <h1>Organization: {currentOrganization.name}</h1>
      <MemberList />
      {isAdmin && <InvitationList />}
    </>
  );
}

// List of organization memberships. Administrators can
// change member roles or remove members from the organization.
function MemberList() {
  const { membershipList, membership } = useOrganization({
    membershipList: {},
  });

  if (!membershipList) {
    return null;
  }

  const isCurrentUserAdmin = membership?.role === "admin";

  return (
    <div>
      <h2>Organization members</h2>
      <ul>
        {membershipList.map((m) => (
          <li key={m.id}>
            {m.publicUserData.firstName} {m.publicUserData.lastName} &lt;
            {m.publicUserData.identifier}&gt; :: {m.role}
            {/* {isCurrentUserAdmin && <AdminControls membership={m} />} */}
          </li>
        ))}
      </ul>
    </div>
  );
}

// function AdminControls({
//   membership,
// }: {
//   membership: OrganizationMembershipResource;
// }){
//   const [disabled, setDisabled] = useState(false);

//   const {
//     user: { id: userId },
//   } = useUser();

//   if (membership.publicUserData.userId === userId) {
//     return null;
//   }

//   const remove = async () => {
//     setDisabled(true);
//     await membership.destroy();
//   };

//   const changeRole = async (role: MembershipRole) => {
//     setDisabled(true);
//     await membership.update({ role });
//     setDisabled(false);
//   };

//   return (
//     <>
//       ::{" "}
//       <button disabled={disabled} onClick={remove}>
//         Remove member
//       </button>{" "}
//       {membership.role === "admin" ? (
//         <button disabled={disabled} onClick={() => changeRole("basic_member")}>
//           Change to member
//         </button>
//       ) : (
//         <button disabled={disabled} onClick={() => changeRole("admin")}>
//           Change to admin
//         </button>
//       )}
//     </>
//   );
// };

// List of organization pending invitations.
// You can invite new organization members and
// revoke already sent invitations.
function InvitationList() {
  const { invitationList } = useOrganization();

  if (!invitationList) {
    return null;
  }

  const revoke = async (inv: any) => {
    await inv.revoke();
  };

  return (
    <div>
      <h2>Invite member</h2>
      <InviteMember />

      <h2>Pending invitations</h2>
      <ul>
        {invitationList.map((i) => (
          <li key={i.id}>
            {i.emailAddress} <button onClick={() => revoke(i)}>Revoke</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InviteMember() {
  const { organization } = useOrganization();
  const [emailAddress, setEmailAddress] = useState("");
  const [role, setRole] = useState<"basic_member" | "admin">("basic_member");
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setDisabled(true);
    await organization?.inviteMember({ emailAddress, role });
    setEmailAddress("");
    setRole("basic_member");
    setDisabled(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Email address"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
      />
      <label>
        <input
          type="radio"
          checked={role === "admin"}
          onChange={() => {
            setRole("admin");
          }}
        />{" "}
        Admin
      </label>
      <label>
        <input
          type="radio"
          checked={role === "basic_member"}
          onChange={() => {
            setRole("basic_member");
          }}
        />{" "}
        Member
      </label>{" "}
      <button type="submit" disabled={disabled}>
        Invite
      </button>
    </form>
  );
}
