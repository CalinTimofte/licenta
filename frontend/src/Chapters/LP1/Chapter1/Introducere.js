export const LP1Introducere = 
    <>
        <h1>Capitolul 1</h1>
        <h2>Motivatie si Introducere</h2>
        <p>
            Logica de ordinul I, pe care o vom studia ˆın continuare, este o extensie a logicii
            propozit,ionale, extensie care aduce un plus de expresivitate. Expresivitatea
            adit,ional ̆a este necesar ̆a pentru a putea modela anumite afirmat,ii care nu pot
            fi exprimate ˆın logica propozit,ional ̆a.
            ˆIn logica propozit,ional ̆a, nu putem exprima ˆıntr-un mod natural urm ̆atoarea
            afirmat,ie: Orice om este muritor.
            Pentru a modela o afirmat,ie ˆın logica propozit,ional ̆a, identific ̆am ˆıntˆai
            propozit,iile atomice. Apoi asociem fiec ̆arei propozit,ii atomice o variabil ̆a
            propozit,ional ̆a. Propozit,iile atomice sunt propozit,iile care nu pot fi ˆımp ̆art,ite
            ˆın alte propozit,ii mai mici, care s ̆a fie conectate ˆıntre ele prin conectorii logici
            ¬, ∧, ∨, →s,i respectiv ↔.
            Observ ̆am c ̆a afirmat,ia Orice om este muritor nu poate fi descompus ̆a
            ˆın afirmat,ii indivizibile legate ˆıntre ele prin conectorii logicii propozit,ionale,
            dup ̆a cum este descris mai sus. As,adar, ˆın logica propozit,ional ̆a, afirmat,ia
            este atomic ̆a. Asociem ˆıntregii afirmat,ii o variabil ̆a propozit,ional ̆a p ∈A.
            Acum s ̆a model ̆am afirmat,ia Socrate este om. Evident, acestei a doua
            afirmat,ii trebuie s ̆a ˆıi asociem o alt ̆a variabil ̆a propozit,ional ̆a q ∈ A. S ̆a
            presupunem c ̆a s,tim c ̆a p s,i q sunt adev ̆arate. Formal, s,tim c ̆a lucr ̆am cu o
            atribuire τ : A →B astfel ˆıncˆat τ(p) = 1 s,i τ(q) = 1. Putem trage concluzia
            ca afirmat,ia Socrate este muritor este adev ̆arat ̆a ˆın atribuirea τ?
            Nu, deoarece afirmat,iei Socrate este muritor ar trebui s ̆a ˆıi asociem o
            a treia variabil ̆a propozit,ional ̆a r s,i nu putem trage nicio concluzie asupra
            lui τ(r) din faptul c ̆a τ(p) = 1 s,i τ(q) = 1. Deci, din semantica logicii
            propozit,ionale, nu putem trage concluzia c ̆a r este adev ̆arat ̆a ˆın orice atribuire
            ˆın care p s,i q sunt adev ̆arate, ˆın ciuda faptului c ̆a, dac ̆a orice om este muritor
            s,i Socrate este om atunci sigur Socrate este muritor. Aceast ̆a diferent, ̆a ˆıntre
            realitate s,i modelarea noastr ̆a ne indic ̆a faptul c ̆a modelarea nu este suficient
            de bun ̆a.
            Logica de ordinul I aduce, ˆın plus fat, ̆a de logica propozit,ional ̆a, not,iunea
            de cuantificator (existent,ial sau universal) s,i not,iunea de predicat. Cuantifica-
            torul universal este notat cu ∀(de la litera A ˆıntoars ̆a – all ˆın limba englez ̆a),
            iar cuantificatorul existent,ial este notat cu ∃(de la litera E ˆıntoars ̆a – exists
            ˆın limba englez ̆a).
            Un predicat este o afirmat,ie a c ̆arei valoare de adev ̆ar depinde de zero sau
            mai mult,i parametri. De exemplu, pentru afirmat,ia de mai sus, vom folosi
            dou ̆a predicate: O s,i M. Predicatul O va fi definit astfel: O(x) va fi adev ̆arat
            cˆand x este om. Predicatul M(x) este adev ̆arat cˆand x este muritor. Deoarece
            predicatele de mai sus au fiecare cˆate un singur argument/parametru, ele se
            numesc predicate unare. Predicatele generalizeaz ̆a variabilele propozit,ionale
            prin faptul c ̆a pot primi argumente. De fapt, variabilele propozit,ionale pot fi
            v ̆azute ca predicate f ̆ar ̆a argumente.
            Astfel, afirmat,ia orice om este muritor va fi modelat ̆a prin formula
            (∀x.(O(x) →M(x))),
            care este citit ̆a astfel: pentru orice x, dac ̆a O de x, atunci M de x. Afirmat,ia
            Socrate este om va fi modelat ̆a prin formula O(s), unde s este o constant ̆a
            prin care ˆınt,elegem Socrate, la fel cum prin constanta 0 ne referim la num ̆arul
            natural zero. De exemplu, O(s) este adev ̆arat (deoarece s denot ̆a un om), dar
            O(l) este fals dac ̆a, spre exemplu, l este o constant ̆a care t,ine locul c ̆at,elului
            L ̆abus, .
            Afirmat,ia Socrate este muritor va fi reprezentat ̆a prin M(s) (deoarece con-
            stanta s se refer ̆a la Socrate). Afirmat,ia M(s) este adev ̆arat ̆a deoarece Socrate
            este muritor; la fel s,i afirmat,ia M(l) este adev ̆arat ̆a.
            Vom vedea c ̆a ˆın logica de ordinul I, formula M(s) este consecint, ̆a a for-
            mulelor (∀x.(O(x) →M(x))) s,i respectiv O(s). ˆIn acest sens, logica de ordinul
            I este suficient de expresiv ̆a pentru a explica din punct de vedere teoretic
            rat,ionamentul prin care putem deduce c ̆a Socrate este muritor din faptul c ̆a
            Orice om este muritor s,i din faptul c ̆a Socrate este om.
        </p>
    </>

export const LP1Introduction = 
    <>
        <h1>Chapter 1</h1>
        <h2>Motivation and Introduction</h2>
        <p>
                    First-order logic, what we will be studying next, is an extension of propo-
            sitional logic, extension that brings more expressivity. The additional ex-
            pressivity is necessary in order to model certain statements that cannot be
            expressed in propositional logic.
            In propositional logic, we cannot express naturally the following statement:
            All men are mortal.
            To model a statement in propositional logic, we identify the atomic propo-
            sitions. Then we associate to each atomic proposition a propositional variable.
            The atomic propositions are the propositions that cannot be split into one or
            more smaller propositions, linked among them by the logical connectives of
            propositional logic: ¬, ∧, ∨, → and ↔.
            We notice that the statement All men are mortal cannot be decomposed
            into smaller statements linked among them by the logical connectives of propo-
            sitional logic, as is described above. Therefore, in propositional logic, the
            statement is atomic. So we associate to the entire statement a propositional
            variable p ∈ A.
            Let us now model the statement Socrates is a man. Obviously, to this
            second statement we must associate another propositional variable q ∈ A.
            Let us assume that p and q are true. Formally, we work in a truth assignment
            τ : A → B where τ (p) = 1 and τ (q) = 1. Can we draw the conclusion that
            Socrates is mortal in the truth assignment τ ?
            No, because to the statement Socrates is mortal we should associate a
            third propositional variable r ∈ A. We cannot draw any conclusion on τ (r)
            from τ (p) = 1 and τ (q) = 1. So, from the semantics of propositional logic, we
            cannot draw the conclusion that r is true in any truth assignment that makes
            both p and q true. This is despite the fact that, in any world where All men
            are mortal and Socrates is a man, we can draw the conclusion that Socrates
            is mortal without failure. This difference between reality and our modelling
            indicates that our modelling is not sufficient for our purposes.
            First-order logic includes, in addition to propositional logic, the notion of
            quantifier and the notion of predicate. The universal quantifier is denoted by
            ∀ and the existential quantifier is denoted by ∃.
            A predicate is a statement whose truth value depends on zero or more
            parameters. For example, for the statements above, we will be using two
            predicates: Man and Mortal. The predicate Man is the predicate that denotes
            the quality of being a man: Man(x) is true iff x is a man. The predicate Mortal
            is true when its argument is mortal. As the predicates above have only one
            argument/parameter, they are called unary predicates. Predicates generalize
            propositional variables by the fact that they can take arguments. Actually,
            propositional variable can be regarded as predicates with no arguments.
            In this way, the statement All men are mortal will be modelled by the
            formula (∀x.(Man(x) → Mortal(x))),
            which is read as follows: for any x, if Man of x, then Mortal of x. The
            statement Socrate is a men shall be modelled by the formula Man(s), where
            s is a constant that denotes Socrates, just like 0 denotes the natural number
            zero. For example, Man(s) is true (as s stands for a particular man – Socrates),
            but Man(l) is false if l is a constant standing for the dog Lassie.
            The statement Socrates is mortal shall be represented by Mortal(s) (recall
            that the constant s stands for Socrates). The statement Mortal(s) is true, as
            Socrates is mortal; likewise, the statement Mortal(l) is also true.
            We shall see that in first-order logic, the formula Mortal(s) is a logical con-
            sequence of the formulae (∀x.(Man(x) → Mortal(x))) and respectively Man(s).
            Therefore, first-order logic is sufficiently expressive to explain theoretically the
            argument by which we deduce that Socrates is mortal from the facts that All
            men are mortal and Socrates is a man.
        </p>
    </>