const SectionHeader = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <div className="mb-12 w-full">
      <h2 className="text-gray-900 text-2xl text-center font-shantell font-semibold mb-4 lg:mb-2">
        {title}
      </h2>
      <p className="text-gray-600 text-lg  mx-auto lg:text-xl text-center max-w-4xl ">
        {description}
      </p>
    </div>
  )
}

export default SectionHeader
