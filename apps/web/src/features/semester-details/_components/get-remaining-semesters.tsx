import RemainingSemesterCard from "./remaining-semesters-card";

const GetRemainingSemester = async ({ semId }: { semId: string }) => {
	return <RemainingSemesterCard semId={semId} />;
};

export default GetRemainingSemester;
