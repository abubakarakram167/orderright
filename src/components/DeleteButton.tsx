"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { serverUrl } from "utils/api";

const DeleteButton = ({ id }: { id: string }) => {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	if (status === "unauthenticated" || !session?.user.isAdmin) {
		return;
	}

	const handleDelete = async () => {
		const res = await fetch(`${serverUrl}/api/products/${id}`, {
			method: "DELETE",
		});
		console.log("the response ", res);
		if (res.status === 200) {
			router.push("/menu");
			toast("The product has been deleted!");
		} else {
			const data = await res.json();
			toast.error(data.message);
		}
	};

	return (
		<button
			className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full ml-6"
			onClick={handleDelete}
		>
			<Image src="/delete.png" alt="" width={20} height={20} />
		</button>
	);
};

export default DeleteButton;
