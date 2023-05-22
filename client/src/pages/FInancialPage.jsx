import YouTubeVideos from "../components/Video";
import NavigationBar from "../components/NavigationBar";
import Chatbot from "../components/Chatbot";

const FinancialPage = () => {
  return (
    <div>
      <NavigationBar />
      <div className="FinancialPageMainDiv">
        <div className="FinancialPageSection">
          <h1 id="FPTitle">
            Money Matters: Empowering You with Financial Literacy
          </h1>
          <h2 className="FPSubTitles">
            Financial Literacy: What is it and why is it important?
          </h2>
          <p>
            In today's complex financial landscape, financial literacy is more
            important than ever before. It's the foundation for making smart
            financial decisions that can positively impact your life. Financial
            literacy refers to the ability to understand and manage your
            personal finances effectively. This includes everything from
            budgeting and saving to investing and managing debt. A strong
            foundation in financial literacy can help you set and achieve
            financial goals, make informed decisions about financial products
            and services, and avoid financial pitfalls. By improving your
            financial literacy, you can take control of your finances and build
            a brighter financial future for yourself and your family. In short,
            financial literacy is the key to unlocking financial success and
            stability in today's fast-paced world.
          </p>
          <YouTubeVideos videoType={"Tackling Debt"} />
        </div>
        <div className="FinancialPageSection">
          <h2 className="FPSubTitles">
            Tackling Debt: What can you do? How do you get started?
          </h2>
          <p>
            Debt can be overwhelming, but it's important to remember that you
            have options. The first step to tackling debt is to understand what
            you owe and to whom. Make a list of all your debts, including the
            amount owed, interest rate, and minimum monthly payment. This will
            help you to prioritize which debts to tackle first. Once you have a
            clear picture of your debt, it's time to create a budget. Look for
            areas where you can cut back on expenses and redirect those funds
            towards paying down your debt. Consider using the debt avalanche or
            debt snowball method to prioritize which debts to pay off first. The
            avalanche method involves paying off debts with the highest interest
            rate first, while the snowball method focuses on paying off debts
            with the lowest balance first. Whatever method you choose, be
            consistent and disciplined in your approach. It's also important to
            consider seeking the help of a financial advisor or credit counselor
            if you're feeling overwhelmed. Remember, tackling debt is a
            marathon, not a sprint. But with determination and a solid plan, you
            can take control of your debt and build a brighter financial future.
          </p>
          <YouTubeVideos videoType={"Financial Literacy"} />
        </div>
        <div className="FinancialPageSection">
          <h2 className="FPSubTitles">
            Loans: Different types and what they do
          </h2>
          <p>
            Loans are a common way to finance large purchases or investments.
            There are several different types of loans available to borrowers,
            each with its own features and benefits. Secured loans require
            collateral, such as a car or home, which can be seized by the lender
            if you fail to repay the loan. Examples of secured loans include
            auto loans and mortgages. Unsecured loans, on the other hand, do not
            require collateral, but may have higher interest rates to compensate
            for the increased risk to the lender. Personal loans and credit
            cards are common examples of unsecured loans. Student loans are
            specifically designed to help students pay for college or graduate
            school. They often have lower interest rates and flexible repayment
            options. Other types of loans include payday loans, which are
            short-term loans with high interest rates, and business loans, which
            are designed to help finance business operations and expansions.
            When considering a loan, it's important to understand the terms and
            conditions, interest rates, and repayment options to determine which
            type of loan is best suited for your needs.
          </p>
          <YouTubeVideos videoType={"different loans and what they do"} />
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default FinancialPage;
