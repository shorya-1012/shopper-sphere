type Props = {}

const ProceedToCheckOutButton = (props: Props) => {
    return (
        <button
            className="w-[200px] md:w-[300px] rounded-xl h-[40px] py-2 px-3 bg-red-500 text-white flex justify-center items-center text-sm font-review hover:bg-red-600"
        >
            Proceed To Checkout
        </button>
    )
}

export default ProceedToCheckOutButton