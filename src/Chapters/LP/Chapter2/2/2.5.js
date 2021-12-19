import TextBox from "../../../../Reusables/TextBox"

export const LP2_5 =
    <>
        <h1>2.5 Implications</h1>
        <p>
            Implications are propositions of the form if φ then ψ. The proposition φ
            is called the antecedent and the proposition ψ is called the conclusion (or
            consequent) of the implication.
            An example of an implication is If I get a passing grade in Logic, I will
            buy everyone beer. The antecedent is I get a passing grade in Logic. and the
            conclusion is I will buy everyone beer. When is an implication true? Actually,
            it is easier to say when it is false. An implication is false if and only if the
            antecedent is true, but the conclusion is false. Assume that I got a passing
            grade in Logic. Therefore, the proposition I get a passing grade in Logic is
            true. However, I will not buy beer for everyone (just a few select friends).
            Therefore the proposition I will buy everyone beer is false. Therefore the
            implication If I get a passing grade in Logic, I will buy everyone beer as a
            whole is false (antecedent is true, but conclusion is false).
            The meaning of implications is worth a more detailed discussion as it is
            somewhat controversial. This is mostly because implication as we understand
            it in mathematics can sometimes be subtly different from implication as we
            understand it in everyday life. In everyday life, when we say If I pass Logic,
            I buy beer, we understand that there is a cause-and-effect relation between
            passing Logic and buying beer. This subtle cause-and-effect relation is evident
            in a number of if-then statements that we use in real life: If I have money, I
            will buy a car, If you help me, I will help you, etc. We would never connect
            two unrelated sentences with an implication: the proposition If the Earth is
            round, then 2+2=4 would not be very helpful, even though it is true (both
            the antecedent and the conclusion are true).
            This implication that we use in mathematics is called material implication
            or truth functional implication, because the truth value of the implication as a
            whole depends only on the truth values of the antecedent and the conclusion,
            not on the antecedent and the conclusion itself. This meaning of implication
            sometimes does not correspond to the meaning of natural language implica-
            tions, but it turns out that it is the only sensible interpretation of implications
            in mathematics (and computer science).
            In particular, we will take both the propositions If the Earth is flat, then
            2 + 2 = 5 and If the Earth is flat, then 2 + 2 = 4 to be true, because the
            antecedent is false. Implications that are true because the antecedent is false
            are called vacuously true.
        </p>
        <br />

        <p>
            <b>Exercise 6.</b> What are the truth values of If 2 + 2 = 4, then the Earth is flat
            and If 2 + 2 = 5, then the Earth is flat?
            The truth value of an implication if φ then ψ, depending on the truth
            values of its antecedent φ and its conclusion ψ, is summarized in the truth-
            table below:
        </p>
        <br/>

        <table className = "table">
            <tr>
                <th>φ</th>
                <th>ψ</th>
                <th>if φ then ψ</th>
            </tr>
            <tr>
                <td>false</td>
                <td>false</td>
                <td>true</td>
            </tr>
            <tr>
                <td>false</td>
                <td>true</td>
                <td>true</td>
            </tr>
            <tr>
                <td>true</td>
                <td>false</td>
                <td>false</td>
            </tr>
            <tr>
                <td>true</td>
                <td>true</td>
                <td>true</td>
            </tr>
        </table>
        <br/>

        <p>
            The following example aims at convincing you that the truth table above
            is the only reasonable one. You must agree that every natural number is
            also an integer. Otherwise put, the proposition for any number x, if x is a
            natural, then x is an integer is true. In particular, you will agree that the
            proposition above holds for x = −10, x = 10 and x = 1.2. In particular, the
            propositions If −10 is a natural, then −10 is an integer, If 10 is a natural,
            then 10 is an integer and If 1.2 is a natural, then 1.2 is an integer must all
            be true. This accounts for the first, second and fourth lines of the truth table
            above (typically, the second line is controversial). As for the third line, false
            is the only reasonable truth value for an implication if φ then ψ where φ is
            true but ψ is false. Otherwise, we would have to accept propositions such as
            If 2 + 2 = 4, then 2 + 2 = 5 (antecedent 2 + 2 = 4 true, conclusion 2 + 2 = 5
            false) as being true.
            Implications are sometimes subtle to spot and identify correctly. For ex-
            ample, in the proposition I will pass Logic only if I study hard (emphasis on
            only if ), the antecedent is I will pass Logic and the conclusion is I study hard.
            In particular, the above proposition does not have the same meaning as If I
            study hard, then I will pass Logic.
        </p> 
        <br/>

        <TextBox text = {<p>Pay attention! In propositions of the form I will pass Logic only
                        if I study, the antecedent is I will pass Logic, and the consequent
                        is I study. This proposition does not have the same meaning as if
                        I study, then I will pass Logic.</p>}/>
        <br/>


        <p>
        Implications can sometimes not make use of if. For example, take the
        proposition I will pass Logic or I will drop school (apparently a disjunction).
        This most likely meaning of this proposition is If I do not pass Logic, then I
        will drop school. Thankfully, both of these propositions are equivalent, in a
        sense that we shall study in the following lectures.
        </p>
    </>