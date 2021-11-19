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