interface MainHeadingProps {
  heading: string;
  reference?: {
    link: string;
    label: string;
  };
}

export const MainHeading = ({ heading, reference }: MainHeadingProps) => {
  return (
    <section className="mb-6">
      <h2 className="inline text-3xl font-bold">{heading}</h2>
      {reference && (
        <a
          href={reference?.link}
          style={{
            paddingLeft: "5px",
            color: "#0066cc",
            textDecoration: "none",
          }}
        >
          [{reference?.label}]
        </a>
      )}
    </section>
  );
};
