---
title: "Predicting lexical decision reaction times from LMs"
subtitle: "Survey for Psycholinguistics Gym"
author: Jacob Hoover Vigly
date: 2026-03-02
bibliography: survey-lexical-decision.bib
csl: https://raw.githubusercontent.com/citation-style-language/styles/master/apa.csl
format:
  html:
    toc: true
    toc-depth: 2
    number-sections: true
    code-fold: true
---

# Introduction {#sec-intro}

This document catalogs papers and datasets on lexical decision reaction times (LD-RTs). A central finding across this literature is that word frequency (or unigram surprisal) is generally the single most powerful predictor, typically accounting for 30--40% of variance, while modern distributional and neural models contribute to explaining additional variance through semantic neighborhood, morphological transparency, and tokenization-derived features.

# Terminology and Abbreviations {#sec-terminology}

## Datasets and resources {#sec-termdatasets}

- **ELP:** English Lexicon Project — the largest English megastudy of visual lexical decision and naming (~40K words; Balota et al., 2007).
- **BLP:** British Lexicon Project — British English lexical decision megastudy (~29K words; Keuleers et al., 2012).
- **DLP / DLP2:** Dutch Lexicon Project (1 and 2) — Dutch lexical decision megastudies (14K and 30K words; Keuleers et al., 2010; Brysbaert et al., 2016).
- **FLP:** French Lexicon Project (~39K words; Ferrand et al., 2010).
- **CLP:** Chinese Lexicon Project (25K+ Traditional Chinese compounds; Tse et al., 2017).
- **MELD-SCH:** Megastudy of Lexical Decision in Simplified Chinese (12.5K words; Tsang et al., 2018).
- **SPALEX:** Spanish Lexical Decision database (~45K words; Aguasvivas et al., 2020).
- **ICP:** Italian Crowdsourcing Project (130K+ words; Amenta et al., 2025).
- **ECP:** English Crowdsourcing Project (62K words; Mandera et al., 2020).
- **MALD:** Massive Auditory Lexical Decision database (27K spoken words; Tucker et al., 2019).
- **SPP:** Semantic Priming Project (6.6K prime--target pairs; Hutchison et al., 2013).
- **SUBTLEX-xx:** Subtitle-based word frequency norms. Variants by language: SUBTLEX-US (American English), SUBTLEX-UK (British English), SUBTLEX-NL (Dutch), SUBTLEX-DE (German), SUBTLEX-CH (Chinese).
- **SWOW-EN:** Small World of Words — English word association norms (De Deyne et al., 2019).
- **SCOPE:** South Carolina Psycholinguistic Metabase — aggregated psycholinguistic norms (Lewis et al., 2023).

## Experimental and psycholinguistic terms {#sec-termexpt}

- **LD / LDT:** Lexical decision (task) — participant sees a letter string and decides whether it is a real word ("yes") or a nonword ("no").
- **RT:** Reaction time (milliseconds) — the time between stimulus onset and the participant's button press.
- **zRT:** z-scored RT — each participant's RTs are standardized (mean-subtracted and SD-divided) before averaging across participants per item, removing individual speed differences.
- **DV:** Dependent variable — the human behavioral measure being predicted (e.g., RT, accuracy).
- **AoA:** Age of acquisition — the age at which a word is typically learned; rated by adults retrospectively or estimated from child data.
- **BOI:** Body-object interaction — how easily a human body can interact with the referent of a word (e.g., "cup" is high-BOI, "democracy" is low).
- **SER:** Sensory experience rating — the degree to which a word evokes a sensory or perceptual experience.
- **NoF:** Number of features — the count of semantic features listed by participants for a concept (from feature-listing norms like McRae et al., 2005).
- **NOS:** Number of senses — the count of distinct meanings a word has (often from WordNet).
- **CD:** Contextual diversity — the proportion of documents (or contexts) in a corpus that contain a given word. Often a better predictor of RT than raw frequency.
- **SND:** Semantic neighborhood density — the average similarity (typically cosine) between a word's vector and its $k$ nearest neighbors in a distributional semantic space.
- **OLD20:** Orthographic Levenshtein Distance 20 — the mean edit distance from a word to its 20 closest orthographic neighbors, across all word lengths.
- **N (Coltheart's N):** Orthographic neighborhood size — the number of words that can be formed by substituting a single letter, preserving word length and letter position.
- **PND:** Phonological neighborhood density — the auditory analogue of Coltheart's N: number of words differing by one phoneme.

## Distributional and computational models {#sec-termmodels}

- **LM:** Language model — any computational model that assigns probabilities to sequences of words (or that learns representations from text). Used broadly here to include simple frequency counts, embedding models, and modern neural models.
- **LSA:** Latent Semantic Analysis — a count-based distributional model that applies singular value decomposition (SVD) to a term-document matrix.
- **HAL:** Hyperspace Analogue to Language — a co-occurrence-based model using a sliding window to build word vectors.
- **HiDEx:** High Dimensional Explorer — an extension of HAL with parameterizable window shape and weighting.
- **BEAGLE:** Bound Encoding of the Aggregate Language Environment — a model that encodes both co-occurrence and word-order information using holographic reduced representations.
- **PPMI-SVD:** Positive Pointwise Mutual Information with SVD — a count-based embedding method.
- **BPE:** Byte-Pair Encoding — a subword tokenization algorithm used in GPT-2 and similar models. Iteratively merges the most frequent character pairs.
- **WordPiece:** A subword tokenization algorithm used in BERT. Similar to BPE but selects merges by likelihood rather than frequency.
- **UnigramLM:** A subword tokenization algorithm (Kudo, 2018) used in XLNet and T5. Selects a vocabulary that maximizes corpus likelihood under a unigram model.

## Discrimination-based models {#sec-termdiscrim}

- **NDL:** Naive Discriminative Learning — a model based on the equilibrium equations of the Rescorla--Wagner learning rule. Maps letter n-gram cues to word outcomes ("lexomes") to derive discrimination-based measures.
- **LDL:** Linear Discriminative Learning — an extension of NDL that uses the Widrow--Hoff learning rule to learn linear mappings between form vectors and semantic vectors.
- **DLM:** Discriminative Lexicon Model — the broader theoretical framework (Baayen et al., 2019) in which LDL is the core computational mechanism.
- **G2L:** Grapheme-to-Lexome — the mapping from orthographic input cues to lexical outcomes in NDL/LDL. "G2L prior" is the column 1-norm of this mapping, analogous to word frequency.
- **L2L:** Lexome-to-Lexome — the mapping between lexical outcomes in NDL, capturing paradigmatic (associative) structure.

## Process and decision models {#sec-termprocess}

- **DDM:** Drift-diffusion model — an evidence accumulation model in which a noisy signal drifts from a starting point toward one of two decision boundaries. The key parameters are drift rate (quality of evidence), boundary separation (response caution), and nondecision time (encoding + motor time). Introduced by Ratcliff (1978).
- **SPRT:** Sequential probability ratio test — the optimal procedure for choosing between two hypotheses by accumulating log-likelihood ratios until a threshold is reached. The Bayesian Reader implements an SPRT for word recognition.
- **LBA:** Linear ballistic accumulator — an evidence accumulation model in which evidence for each response option accumulates deterministically (no within-trial noise); variability comes from random start points and drift rates across trials (Brown & Heathcote, 2008).
- **REM-LD:** Retrieving Effectively from Memory — Lexical Decision. A model (Wagenmakers et al., 2004) in which lexical decision is framed as a global memory matching problem: the stimulus is compared to all memory traces, and the resulting likelihood ratio drives a random walk.
- **MROM:** Multiple Read-Out Model — an interactive activation model specifically designed for the lexical decision task (Grainger & Jacobs, 1996). It uses three response criteria: a local activity threshold (single word unit activation → "yes"), a global activity threshold (summed activation → fast "yes" via familiarity), and a temporal deadline (no activation → "no").
- **DRC:** Dual Route Cascaded model — a computational model of visual word recognition with two processing routes: a lexical route (whole-word lookup) and a sublexical route (grapheme-to-phoneme conversion). Produces LD predictions via lexical-route activation (Coltheart et al., 2001).
- **PDP:** Parallel Distributed Processing — the connectionist framework. In word recognition, refers specifically to the Seidenberg & McClelland (1989) "triangle model" with orthographic, phonological, and semantic layers.

## Statistical and evaluation terms {#sec-termstats}

- **$R^2$:** Coefficient of determination — proportion of variance in the DV explained by the model.
- **$\Delta R^2$ / ΔLL:** Change in $R^2$ (or change in log-likelihood) when adding a predictor to a baseline model. Also called "psychometric predictive power" (PPP) in some literatures.
- **GAMM:** Generalized Additive Mixed Model — a regression framework that allows nonlinear predictor effects via smooth functions, plus random effects for participants and items.
- **PAMM:** Piecewise Additive Mixed Model — a survival analysis framework used by Hendrix & Sun (2021) to model the hazard of response at each time point.

# Major Lexical Decision Datasets {#sec-datasets}

These datasets serve as the primary benchmarks against which all models are evaluated.

## English Lexicon Project (ELP) {#sec-elp}

**Citation:** @balota2007elp

- **Dataset:** ELP; 40,481 words + 40,481 nonwords; 816 participants (LDT), 444 (naming); American English; freely available at elexicon.wustl.edu.
- **Paradigm:** Visual lexical decision (uppercase presentation) and speeded naming; each participant responds to a large subset.
- **Human DV:** Mean RT (ms), z-scored RT (I_Zscore), accuracy.
- **LM input:** Individual word strings.
- **LM output:** Log HAL frequency, Kučera--Francis frequency, orthographic N, word length (letters, syllables, morphemes), phonological N, bigram frequency.
- **Evaluation:** Item-level multiple regression; standard variables account for ~42--45% of variance in LD RT for monosyllabic words.
- **Key findings:** Established the benchmark megastudy approach. Word frequency is the dominant predictor. Enabled post-hoc testing of any new predictor against a massive behavioral dataset.

## British Lexicon Project (BLP) {#sec-blp}

**Citation:** @keuleers2012blp

- **Dataset:** BLP; 28,730 words + nonwords; 78 British participants in repeated-measures design; British English; available at crr.ugent.be/blp.
- **Paradigm:** Visual lexical decision (lowercase); nonwords generated by Wuggy algorithm.
- **Human DV:** Mean RT, z-scored RT, accuracy.
- **LM output:** SUBTLEX-US frequency, BNC frequencies, AoA, familiarity, imageability.
- **Evaluation:** Correlations with ELP ($r \approx .74$ for zRTs); frequency accounts for ~38% of RT variance.
- **Key findings:** Megastudy results are robust across American vs. British English and uppercase vs. lowercase presentation.

## Dutch Lexicon Project (DLP1) {#sec-dlp1}

**Citation:** @keuleers2010dlp

- **Dataset:** DLP1; 14,000 words + 14,000 nonwords; 39 participants (fully repeated measures); Dutch.
- **Paradigm:** Visual lexical decision (lowercase).
- **Human DV:** RT, accuracy.
- **LM output:** CELEX frequency, SUBTLEX-NL frequency, word length, orthographic N.
- **Key findings:** SUBTLEX-NL frequencies explain up to 10% more variance than CELEX. Practice effects are minimal across sessions. Introduced the fully repeated-measures megastudy design.

## Dutch Lexicon Project 2 (DLP2) {#sec-dlp2}

**Citation:** @brysbaert2016dlp2

- **Dataset:** DLP2; 30,000 Dutch lemmas; ~81 participants.
- **Human DV:** Lexical decision RT (zRT), accuracy.
- **LM output:** Word prevalence (% population knowing word), SUBTLEX-NL frequency, AoA, OLD20, concreteness.
- **Key findings:** Word prevalence is the second strongest predictor after frequency, contributing ~10% unique variance. Words known by everyone are responded to 100 ms faster than words known to only 50% of the population.

## French Lexicon Project (FLP) {#sec-flp}

**Citation:** @ferrand2010flp

- **Dataset:** FLP; 38,840 French words + 38,840 pseudowords; 975 participants; French.
- **Paradigm:** Visual lexical decision (lowercase).
- **Human DV:** Mean RT, accuracy.
- **LM output:** Lexique database frequency, word length.
- **Key findings:** Frequency accounts for ~38% of RT variance. Confirmed cross-linguistic generality of frequency and length effects.

## MEGALEX {#sec-megalex}

**Citation:** @ferrand2018megalex

- **Dataset:** 28,466 French words (visual LDT) + 17,876 words (auditory LDT); ~1,000 participants; French.
- **Paradigm:** Both visual and auditory lexical decision.
- **Human DV:** RT, accuracy.
- **LM output:** Five frequency measures compared (Lexique, SUBTLEX, Worldlex), OLD20, syllable count.
- **Key findings:** First megastudy enabling direct visual vs. auditory comparison. Worldlex frequencies (Twitter + blogs + newspapers) explained slightly more variance (~48.5%) than classic subtitle frequencies (~47.6%) for visual LDT.

## MELD-SCH {#sec-meldsch}

**Citation:** @tsang2018meldsch

- **Dataset:** 12,578 words; 504 participants; Simplified Chinese (Mandarin).
- **Human DV:** RT, accuracy.
- **LM output:** SUBTLEX-CH frequency, contextual diversity, stroke count, radical frequency, semantic transparency.
- **Key findings:** Contextual diversity accounts for ~35% of RT variance. Discovered U-shaped word-length × RT relationship in Chinese.

## Chinese Lexicon Project {#sec-clp}

**Citation:** @tse2017clp

- **Dataset:** 25,000+ Traditional Chinese two-character compound words; ~594 Cantonese speakers.
- **Human DV:** LD RT, accuracy.
- **LM output:** SUBTLEX-CH subtitle frequency, contextual diversity, stroke count, character frequency.
- **Key findings:** Subtitle-based contextual diversity is the strongest predictor. Both character-level and word-level variables contribute.

## SPALEX {#sec-spalex}

**Citation:** @aguasvivas2020spalex

- **Dataset:** ~45,000 Spanish words; 150,000+ participants (crowdsourced); 20 Spanish-speaking countries.
- **Human DV:** LD accuracy, RT.
- **Key findings:** Cross-dialectal lexical decision data; frequency, length, and orthographic neighborhood reliably predict RTs across diverse populations.

## Italian Crowdsourcing Project {#sec-icp}

**Citation:** @amenta2025italian

- **Dataset:** 130,465 Italian words; 156,000+ participants; Italian.
- **Human DV:** Word recognition RT, accuracy (online task).
- **Key findings:** ICP RTs correlate $r = .78$ with lab-based lexical decision latencies. Word prevalence effects replicated for Italian.

## English Crowdsourcing Project {#sec-ecp}

**Citation:** @mandera2020ecp

- **Dataset:** 62,000 English words; >1 million participants.
- **Human DV:** Word recognition RT.
- **Key findings:** Provides valid RTs for ~35,000 words not in ELP. Correlation with ELP: $r \approx .75$.

## MALD (Massive Auditory Lexical Decision) {#sec-mald}

**Citation:** @tucker2019mald

- **Dataset:** 26,793 words + 9,592 pseudowords; 231 participants; auditory English.
- **Human DV:** Auditory LD RT, accuracy.
- **LM output:** SUBTLEX frequency, phonological neighborhood density, uniqueness point, phonotactic probability, duration, phoneme/syllable count.
- **Key findings:** First large-scale auditory LD database. Word frequency and phonological neighborhood density are major predictors. Used as a benchmark for TRACE, TISK, DIANA, and DLM models.


# Classic Corpus-Derived Frequency and Orthographic Predictors {#sec-classic}

## SUBTLEX-US Frequency Norms {#sec-subtlexus}

**Citation:** @brysbaert2009subtlexus

- **Dataset:** SUBTLEX-US corpus (51M words from 8,388 subtitle files); validated against ELP (40,481 words).
- **Human DV:** ELP lexical decision RT, accuracy, naming RT.
- **LM input:** Individual words; subtitle corpus.
- **LM output:** Word frequency per million (SUBTLEXWF), contextual diversity (SUBTLEXCD = % of films containing word), log-transformed versions.
- **Evaluation:** $R^2$ in regression predicting ELP RT.
- **Key findings:** SUBTLEX-US substantially outperforms Kučera--Francis and CELEX. Contextual diversity explains up to 4% more variance than raw frequency. Established subtitle-based frequency as the gold standard.

## SUBTLEX-NL {#sec-subtlexnl}

**Citation:** @keuleers2010subtlexnl

- **Dataset:** 44M-word Dutch subtitle corpus; validated against DLP1.
- **Human DV:** DLP1 lexical decision RT, accuracy.
- **LM output:** SUBTLEX-NL frequency, contextual diversity.
- **Key findings:** SUBTLEX-NL explains up to 10% more variance than CELEX frequencies. Contextual diversity outperforms raw frequency.

## Contextual Diversity {#sec-cd}

**Citation:** @adelman2006cd

- **Dataset:** Three naming + three LD datasets (including Balota et al., 2004 monosyllabic set).
- **Human DV:** LD RT, naming RT.
- **LM input:** Individual words; TASA, BNC, HAL corpora.
- **LM output:** Contextual diversity (CD = proportion of documents containing word) vs. raw frequency.
- **Evaluation:** Multiple regression; 18 analyses (6 datasets × 3 corpora).
- **Key findings:** When CD is controlled, frequency effects are eliminated. When frequency is controlled, CD effects persist. This dissociation holds across all corpora and datasets. Challenged all models that directly attribute frequency effects to cumulative exposure count.

## OLD20 {#sec-old20}

**Citation:** @yarkoni2008old20

- **Dataset:** ELP (monosyllabic subset ~2,906 words + full ~40K).
- **Human DV:** LD RT, naming RT.
- **LM output:** OLD20 = mean Levenshtein distance to 20 nearest orthographic neighbors (includes additions, deletions, transpositions across lengths). Compared with Coltheart's N.
- **Evaluation:** Hierarchical regression; unique variance of OLD20 vs. N after controlling for frequency and length.
- **Key findings:** OLD20 captures substantially more variance than Coltheart's N, especially for longer words. Has become the standard orthographic similarity measure (600+ citations).

## The Rank Hypothesis {#sec-rank}

**Citation:** @murray2004rank

- **Human DV:** LD RT, error rates.
- **LM output:** Word frequency rank (ordinal position in frequency-ordered list) vs. log frequency.
- **Evaluation:** Curve-fitting (rank vs. log-frequency vs. power-law against RT data).
- **Key findings:** Rank frequency provides better fits than log frequency, consistent with a serial search model. Later challenged by @adelman2008frequency who showed contextual diversity undermines the rank hypothesis.

## Frequency and the Decision Stage {#sec-decision}

**Citation:** @balota1984frequency

- **Human DV:** RT across category verification, LD, and pronunciation tasks.
- **LM output:** Word frequency (Kučera--Francis), length.
- **Key findings:** Frequency effects are largest in lexical decision, minimal in category verification. Proposed a two-stage model: fast familiarity-based stage + slower analytic stage. The LD task inflates frequency effects due to task-specific decision processes.

## Lexical Access and Naming Time {#sec-forster}

**Citation:** @forster1973lexical

- **Key findings:** One of the earliest papers establishing the frequency effect in lexical decision. High-frequency words processed faster than low-frequency words. Foundational for the entire field (~1,800 citations).

## Orthographic Neighborhood Size (N) {#sec-coltheartN}

**Citation:** @coltheart1977access

- **LM output:** Orthographic N = number of words formed by single-letter substitution, preserving position and length.
- **Key findings:** Introduced the N metric. N is inhibitory for nonwords but null/facilitatory for words. Became the standard neighborhood measure for decades (superseded by OLD20).

## Neighborhood Effects Review {#sec-andrews}

**Citation:** @andrews1997neighborhood

- **Key findings:** Definitive review showing neighbors facilitate word responses in naming and LD for English. Inhibitory effects arise from task-specific strategies, not lexical competition per se.

## Word Length Effects {#sec-wordlength}

**Citation:** @new2006wordlength

- **Dataset:** ELP (~33,006 words, 3--13 letters).
- **Human DV:** LD RT.
- **LM output:** Letter count, syllable count, orthographic N, log HAL frequency.
- **Key findings:** Discovered a U-shaped relationship between word length and LD RT: facilitatory for 3--5 letters, null for 5--8, inhibitory for 8--13.

## Social Media Frequency {#sec-social}

**Citation:** @herdagdelen2017social

- **Dataset:** ELP + BLP.
- **Human DV:** LD RT.
- **LM output:** Word frequencies from Facebook and Twitter corpora.
- **Evaluation:** $R^2$ comparison with SUBTLEX and HAL frequencies.
- **Key findings:** Social media frequencies explain up to 3.6% more variance than subtitle-based frequencies. Robust across American (ELP) and British (BLP) English.

## Word Prevalence {#sec-prevalence}

**Citation:** @keuleers2015prevalence

- **Dataset:** ~300,000 Dutch participants; ~53,000 words; DLP.
- **Human DV:** LD accuracy, RT.
- **LM output:** Word prevalence = % of population knowing a word.
- **Key findings:** Word prevalence is the strongest independent predictor of LD RT in Dutch. Adds ~10% unique variance beyond frequency, length, and neighborhood.

## Age of Acquisition Norms {#sec-aoa}

**Citation:** @kuperman2012aoa

- **Dataset:** AoA ratings for 30,121 words; validated against ELP.
- **Key findings:** AoA is a significant predictor of LD times after controlling for frequency, length, and other variables. Important covariate for all studies in this space.

## Emotion Effects {#sec-emotion}

**Citation:** @kuperman2014emotion

- **Dataset:** ELP (12,658 words with emotion ratings).
- **Human DV:** LD RT, naming RT.
- **LM output:** Valence and arousal ratings (Warriner et al., 2013), controlling for SUBTLEX frequency, AoA, imageability, SER, BOI, semantic diversity.
- **Key findings:** Negative words are recognized more slowly than positive words; arousing words slower than calming words. Effects persist after controlling for many lexical/semantic variables.

## Noise in Lexical Decision {#sec-noise}

**Citation:** @diependaele2012noise

- **Dataset:** DLP1 (repeated first/last blocks).
- **Key findings:** LD responses suffer from substantial internal noise. Only 83--91% of response choices can be explained even with an optimal model. For low-frequency words, consistent responses approach 50%. This sets an upper bound on variance explainable by any predictor.

## Word Frequency in German {#sec-german}

**Citation:** @brysbaert2011german

- **Dataset:** German LD data (dlexDB and others).
- **LM output:** CELEX, Leipzig, dlexDB, Google Books, SUBTLEX-DE frequencies.
- **Key findings:** Subtitle-based frequencies (SUBTLEX-DE) consistently outperform other norms for German. Frequency explains ~30--40% of RT variance.

## Word Frequency Effect Review {#sec-freqreview}

**Citation:** @brysbaert2018review

- **Key findings:** Comprehensive review. Frequency explains 30--40% of LD variance. Introduced the Zipf scale. Semantic diversity and word prevalence add variance beyond frequency. Individual differences in language exposure modulate frequency effects.


# Distributional Semantics and Word Embeddings Predicting LD {#sec-distributional}

## Word2Vec vs. Count Models {#sec-w2v}

**Citation:** @mandera2017explaining

- **Dataset:** ELP (~40K words), Semantic Priming Project (SPP), Dutch priming data, SimLex-999, WordSim-353.
- **Paradigm:** LD (ELP), naming, semantic priming.
- **Human DV:** LD RT, naming RT, priming RT.
- **LM input:** Individual words; word2vec trained on OpenSubtitles corpus.
- **LM output:** Cosine similarity between word vectors; semantic neighborhood density (SND).
- **Evaluation:** $R^2$ in multiple regression with covariates (frequency, length, etc.).
- **LMs tested:** Word2Vec CBOW, Word2Vec Skip-gram, GloVe, LSA, BEAGLE, HAL, PPMI-SVD.
- **Key findings:** Best CBOW model explained 45.5% of ELP LD RT variance (vs. 43.9% for LSA, 43.0% for BEAGLE). Prediction-based models (word2vec) consistently outperform count-based models when properly parameterized. Subtitle corpora produce better vectors than book corpora. This is the most comprehensive comparison of distributional models for LD prediction.

## HiDEx {#sec-hidex}

**Citation:** @shaoul2010hidex

- **Dataset:** ELP.
- **Human DV:** LD RT, semantic decision RT.
- **LM output:** Semantic neighborhood density (NCOUNT), average radius of co-occurrence (ARC), from HiDEx (extension of HAL model) trained on USENET.
- **Key findings:** Words with higher SND produce shorter LD RTs (facilitatory effect). Optimal parameters: window of 10 words behind, 0--5 ahead, inverse ramp weighting.

## subs2vec {#sec-subs2vec}

**Citation:** @vanparidon2021subs2vec

- **Dataset:** ELP, BLP, DLP, and megastudies in other languages.
- **Human DV:** LD RT.
- **LM input:** Individual words; fastText Skip-gram trained on OpenSubtitles.
- **LM output:** SND (cosine similarity in embedding space), word frequency.
- **LMs tested:** fastText Skip-gram embeddings in 55 languages.
- **Key findings:** Subtitle-trained embeddings perform comparably to Wikipedia-trained embeddings for predicting LD RTs. Validated cross-linguistically.

## Nonword Processing in BLP {#sec-nonword}

**Citation:** @hendrix2021nonword

- **Dataset:** BLP (18,547 words + 27,079 nonwords).
- **Human DV:** LD latencies (individual trial-level, analyzed as hazard functions).
- **LM input:** Words and nonwords through fastText (subword n-grams allow nonword vectors).
- **LM output:** Frequency (applicable to nonwords via Google frequency), SND, orthography-to-semantics consistency (OSC).
- **Evaluation:** Piecewise additive mixed models (PAMMs)---survival analysis.
- **LMs tested:** fastText (uniquely allows nonword vector computation via subword architecture).
- **Key findings:** First documentation of a true nonword frequency effect. SND and OSC are facilitatory for words but inhibitory for nonwords. PAMM analysis reveals temporal dynamics of these effects.

## SWOW-EN Word Associations {#sec-swow}

**Citation:** @dedeyne2019swow

- **Dataset:** ELP, Calgary Semantic Decision Project; SWOW-EN (88,710 participants, 12,292 cues).
- **Human DV:** LD RT, naming RT, semantic categorization RT.
- **LM output:** Associative strength, cosine similarity in PPMI space, spreading activation measures.
- **Key findings:** Word association frequency from SWOW-EN correlates with LD RTs at levels comparable to SUBTLEX frequency. For semantic categorization, association-based measures outperform word frequency.

## Semantic Distinctiveness {#sec-semdist}

**Citation:** @johns2022distinctiveness [see also @jones2012diversity]

- **Dataset:** ELP, BLP, DLP.
- **Human DV:** LD RT, accuracy, naming RT.
- **LM output:** Semantic distinctiveness (SD), user-based contextual diversity (UCD-SD) from Reddit; counts unique vs. redundant contexts.
- **Key findings:** Semantic diversity/distinctiveness encapsulates all variance from frequency and document count, plus explains additional unique variance. UCD-SD model improved fits by up to 22.5% over word frequency for BLP accuracy data.

## Traces of Meaning {#sec-traces}

**Citation:** @sassenhagen2020traces

- **Dataset:** EEG during isolated word reading (LD-like paradigm); English and German.
- **Human DV:** ERPs during isolated word reading.
- **LM input:** Individual words.
- **LM output:** FastText 300-dimensional word vectors.
- **Evaluation:** Encoding/decoding analyses (Ridge regression, 10-fold CV); comparison vs. WordNet.
- **LMs tested:** FastText vs. WordNet.
- **Key findings:** FastText vectors significantly encode brain activity during isolated word reading, outperforming WordNet. Distributional vectors capture semantic representations even without sentence context.

## Semantic Richness Effects {#sec-richness}

**Citation:** @pexman2008richness

- **Dataset:** ELP (subsets of ~2,000--4,000 words with available semantic norms).
- **Paradigm:** Visual LD (ELP data).
- **Human DV:** LD RT, naming RT.
- **LM input:** Individual words; semantic norms derived from feature listing and corpus statistics.
- **LM output:** Three measures of semantic richness: number of features (NoF, from McRae et al., 2005 feature norms), contextual dispersion (CD), and number of senses (NOS, from WordNet).
- **Evaluation:** Hierarchical regression; unique variance of each richness measure after controlling for frequency (log HAL), length, orthographic N, and the other two richness variables.
- **Key findings:** All three semantic richness measures independently predict LD RT: words that are semantically richer (more features, more senses, more dispersed across contexts) are recognized faster. The effects are additive, meaning that richness is a multidimensional construct. This paper anchors a broader cluster of work on body-object interaction (BOI), sensory experience ratings (SER), imageability, and number of associates as LD predictors---all of which represent a distinct predictor class ("semantic richness") beyond the frequency/form variables that dominate the megastudy literature. Relevant to the Gym because any model claiming to predict LD must account for the fact that meaning-level variables have independent effects even in isolated word recognition.


# Discriminative Learning Models {#sec-discriminative}

## Naive Discriminative Learning (NDL) {#sec-ndl}

**Citation:** @baayen2011ndl

- **Dataset:** ELP; Serbian sentential reading.
- **Human DV:** LD RT (ELP), reading times (Serbian).
- **LM input:** Letter n-gram cues mapped to lexical outcomes (lexomes) via Rescorla--Wagner equilibrium equations. Trained on BNC (20M words).
- **LM output:** G2L prior (column 1-norm), activation diversity, and other discrimination-based measures.
- **Key findings:** NDL activations correlate strongly with LD RTs. Captures frequency effects, morphological family size effects, and inflectional paradigmatic effects without morpheme-level representations.

## Discrimination in Lexical Decision {#sec-milin}

**Citation:** @milin2017discrimination

- **Dataset:** ELP (large subset); two masked priming experiments.
- **Human DV:** Visual LD latencies.
- **LM output:** NDL-derived measures: G2L prior, G2L activation diversity, L2L prior, L2L I-diversity.
- **Evaluation:** GAMMs; compared discrimination-based vs. classical predictors.
- **Key findings:** Discrimination-based predictors outperform classical frequency and neighborhood measures for both simple and primed LD. All five discriminative dimensions correlate with shorter RTs where correlations are positive.

## Discriminative Lexicon Model (DLM) {#sec-dlm}

**Citation:** @baayen2019dlm

- **Dataset:** ELP, BLP, DLP, MALD.
- **LM output:** Linear Discriminative Learning (LDL)---linear mappings between orthographic/phonological form vectors and semantic vectors (word2vec). Measures: semantic density, form-to-meaning mapping strength, path certainty.
- **Key findings:** DLM-derived measures are significant predictors of LD RT, outperforming classical frequency and neighborhood. Frequency effects emerge as epiphenomena of discrimination learning.

## Vector Space Morphology with LDL {#sec-ldl}

**Citation:** @chuang2021ldl

- **Dataset:** Dutch primed auditory LD (Creemers et al., 2020).
- **Human DV:** Primed auditory LD latencies.
- **LM input:** Word forms as triphone/trigraph vectors mapped to semantic vectors (fastText-derived).
- **LM output:** Semantic support (correlation between predicted and target semantic vectors), uncertainty measures, path counts.
- **LMs tested:** LDL using fastText-style semantic vectors.
- **Key findings:** LDL predicts primed LD latencies. Priming effects that appear to require morpheme-based decomposition can be explained by form-to-meaning mappings without positing morphemes.

## Trial-to-Trial Learning in LD {#sec-trial}

**Citation:** @heitmeier2023trial

- **Dataset:** ELP, BLP, MALD.
- **Human DV:** Trial-by-trial LD RT.
- **LM output:** Widrow--Hoff incremental learning model; trial-to-trial adaptation via LDL.
- **Key findings:** Trial-to-trial incremental learning captures within-experiment practice effects. The model generates semantics for pseudowords, predicting pseudoword rejection times.

## Frequency Effects in LDL {#sec-ldlfreq}

**Citation:** @heitmeier2024frequency

- **Key findings:** Frequency effects in LD emerge naturally from discrimination learning without explicit storage of frequency counts.


# Morphological Processing with Distributional Models {#sec-morphology}

## FRACSS Model {#sec-fracss}

**Citation:** @marelli2015fracss

- **Dataset:** Novel + existing derived words; ELP LD data for existing words.
- **Human DV:** LD RT, meaningfulness judgments, priming latencies.
- **LM input:** Stem vectors + affix matrices from distributional semantic model.
- **LM output:** Compositional derived-word vector; semantic transparency = cosine between composed and whole-word vectors.
- **Evaluation:** Regression of RT on model-derived transparency measures.
- **Key findings:** Semantic transparency from FRACSS modulates stem frequency effects in LD. Compositional and whole-word representations capture complementary aspects of transparency.

## Compound Transparency {#sec-compound}

**Citation:** @guenther2019compound

- **Human DV:** LD RT.
- **LM output:** CAOSS model (Compounding as Abstract Operation in Semantic Space)---compositionality = cosine between predicted and observed whole-word vector.
- **Key findings:** Automatic effect of compositional semantic transparency in unprimed LD, reflecting routine conceptual combination during compound processing.

## Compound Word Megastudy {#sec-compmega}

**Citation:** @kim2019compound

- **Dataset:** 2,861 English compounds; ELP LD and naming data.
- **Human DV:** LD RT, naming RT.
- **LM output:** Human-judged and distributional semantic transparency measures [@mandera2017explaining].
- **Key findings:** Both human-rated and distributional transparency significantly predict compound word processing in LD and naming.

## German Compound Transparency {#sec-germancomp}

**Citation:** @guenther2020german

- **Dataset:** 1,810 German compounds; four behavioral experiments (LD, ratings, eye-tracking).
- **Human DV:** LD RT, transparency ratings, eye-tracking measures.
- **LM output:** Multi-dimensional distributional semantic transparency measures (compositional + relatedness).


# Computational and Process Models of Word Recognition {#sec-processmodels}

This section covers models that provide mechanistic accounts of how the lexical decision is made---not just which variables predict RT, but *how* perceptual evidence is accumulated and a word/nonword decision is reached. These process models are critical to the Gym because they specify the *linking function* between LM-derived quantities and RT distributions.

## Foundational Computational Models {#sec-computational}

### The PDP/Triangle Model {#sec-pdp}

**Citation:** @seidenberg1989pdp

- **Dataset:** Simulations + comparison to naming/LD data from Seidenberg & McClelland experiments.
- **Human DV:** Naming RT, LD accuracy and RT.
- **LM input:** Orthographic input coded as Wickelfeatures; trained on ~3,000 monosyllabic words with frequency-weighted training.
- **LM output:** "Stress" (error between computed and correct output patterns) proposed as basis for LD: high stress → unfamiliar → "no" response.
- **Key findings:** Foundational connectionist model of word recognition. Frequency effects emerge from training exposure. LD modeled as a global familiarity judgment based on error signal. Spawned extensive debate about whether stress is sufficient for LD [see Besner et al. (1990); Plaut (1997)]. Ancestor of the NDL/DLM models in @sec-discriminative.

### Triangle Model with Semantics {#sec-triangle}

**Citation:** @harm2004triangle

- **Dataset:** Simulations + comparison to LD and naming data.
- **Human DV:** LD RT, naming RT, accuracy.
- **LM input:** Orthographic → phonological → semantic pathways; trained on ~6,000 words.
- **LM output:** Semantic stress (discrepancy between computed and stored semantic representations); settlement time.
- **Key findings:** Extended the triangle model to include a full semantic pathway. LD is modeled via semantic stress: the system settles into a familiar attractor for words but not nonwords. Provides computational account of how frequency, imageability, and consistency interact in LD. Directly relevant to the morphological/semantic sections of this survey.

### DRC (Dual Route Cascaded) Model {#sec-drc}

**Citation:** @coltheart2001drc

- **Dataset:** Simulations of extensive naming/LD phenomena; comparison to Coltheart & Rastle (1994), Rastle & Coltheart (1998), and many other LD studies.
- **Human DV:** Naming RT, LD RT, accuracy.
- **LM input:** Letter strings processed through lexical (whole-word recognition) and sublexical (grapheme-to-phoneme rules) routes.
- **LM output:** Activation levels in the orthographic lexicon; cascaded activation through phonological output. LD via lexical route activation exceeding threshold.
- **Key findings:** One of the most cited word recognition models (~4,000 citations). Frequency effects arise from resting activation levels in the orthographic lexicon. Neighborhood effects arise from lateral inhibition. Primarily designed for naming, but generates LD predictions via activation thresholds.

### MROM (Multiple Read-Out Model) {#sec-mrom}

**Citation:** @grainger1996mrom

- **Dataset:** Simulations of LD data including frequency × neighborhood interactions; Grainger & Jacobs experiments.
- **Human DV:** LD RT, accuracy, RT distributions.
- **LM input:** Letter strings activating orthographic word units via interactive activation.
- **LM output:** Three read-out criteria: (1) local activity criterion—single unit exceeds threshold → "yes"; (2) temporal deadline—no unit exceeds threshold in time → "no"; (3) global activity criterion—summed activation exceeds threshold → fast "yes" based on familiarity.
- **Key findings:** The MROM is the computational model most explicitly designed for the lexical decision task. The dual-criterion mechanism (Σ activation for "yes" + temporal deadline for "no") explains how neighborhood density can simultaneously facilitate word responses (more global activation) and slow nonword rejection (more confusable). Provides the theoretical framework for understanding why frequency effects are inflated in LD compared to naming [@balota1984frequency].

## Evidence Accumulation and Decision Models {#sec-accumulation}

### The Drift-Diffusion Model {#sec-ddm}

**Citation:** @ratcliff1978ddm

- **Human DV:** RT distributions + accuracy across two-choice tasks.
- **LM output:** Parameters of a continuous random walk: drift rate $v$ (quality of evidence accumulation), boundary separation $a$ (response caution), starting point $z$ (prior bias), nondecision time $T_{er}$.
- **Key findings:** Introduced the drift-diffusion model (DDM) as a process model of two-choice decisions. The noisy evidence signal accumulates from a starting point toward one of two boundaries ("word" or "nonword"). This became the dominant framework for decomposing RT distributions in LD into process components. All subsequent diffusion model work on LD—including @ratcliff2004diffusion—derives from this foundational paper.

### Diffusion Model Applied to LD {#sec-diffusionld}

**Citation:** @ratcliff2004diffusion

- **Dataset:** Six LD experiments manipulating frequency, nonword type, word proportion.
- **Human DV:** Full RT distributions + accuracy.
- **LM output:** Diffusion model parameters: drift rate (evidence accumulation quality), boundary separation (response caution), nondecision time.
- **Key findings:** All experimental variables affect drift rate. High-frequency words = higher drift rate. Word frequency primarily affects the quality of evidence (drift rate), not response caution or encoding time. Provides mechanistic account separating lexical processing from decision components.

### REM-LD: Global Matching Model {#sec-remld}

**Citation:** @wagenmakers2004remld

- **Dataset:** Simulations + Ratcliff et al. (2004) LD experiments; ELP subsets.
- **Human DV:** Full RT distributions for both words and nonwords; accuracy.
- **LM input:** Words represented as feature vectors in episodic memory; lexical decision framed as a global memory matching problem.
- **LM output:** Log-likelihood ratio $\lambda = \ln \frac{P(\text{data}|\text{word})}{P(\text{data}|\text{nonword})}$, accumulated over time via random walk.
- **Key findings:** Bridges global matching models (REM) with evidence accumulation (DDM). The drift rate in the diffusion model is derived from the Bayesian log-likelihood ratio of word vs. nonword. This provides a principled basis for why frequency affects drift rate: higher-frequency words produce stronger memory matches. Critically, also models nonword rejection—most other models focus only on "yes" responses.

### The Bayesian Reader {#sec-bayesreader}

**Citation:** @norris2006bayesian

- **Dataset:** Simulations + Balota & Spieler (1999) LD data.
- **Human DV:** LD RT, identification thresholds, naming RT.
- **LM input:** Bayesian posterior $P(\text{word}|\text{input})$ using word frequency as prior.
- **Key findings:** Human readers approximate optimal Bayesian decision makers. Model naturally produces logarithmic frequency-RT relationships and accounts for neighborhood density × frequency interactions. The decision process is a form of SPRT (sequential probability ratio test), connecting to @ratcliff1978ddm.

### Bayesian Reader as Unified Account {#sec-bayesunified}

**Citation:** @norris2009unified

- **Dataset:** Simulations + Ratcliff et al. (2004) LD data; Yap et al. word frequency data.
- **Human DV:** Full LD RT distributions (correct responses and errors); accuracy.
- **LM input:** Bayesian posterior $P(\text{word}_i|\text{input})$ updated as perceptual evidence accumulates over time; word frequency as prior probability.
- **LM output:** RT = time for posterior to exceed a response criterion; nondecision time. Model parameters: sampling rate, criterion, noise.
- **Evaluation:** Fits to RT quantiles (.1, .3, .5, .7, .9) and accuracy simultaneously.
- **Key findings:** Demonstrates that the Bayesian Reader subsumes the drift-diffusion model as a special case: when comparing two hypotheses, the Bayesian posterior ratio update is mathematically equivalent to a diffusion process. Provides a unified account of word recognition and the decision process with fewer free parameters than Ratcliff's DDM. Correctly predicts that LD is slower than go/no-go identification because it requires discriminating words from nonwords rather than just identifying words.

### Linear Deterministic Accumulator Models {#sec-lba}

**Citation:** @heathcote2012lba

- **Human DV:** RT distributions, choice probabilities.
- **LM output:** Parameters of a linear ballistic accumulator: drift rates, thresholds, start-point variability.
- **Key findings:** Formalizes the linear ballistic accumulator (LBA) and linear deterministic accumulator frameworks as alternatives to the DDM. The key difference from diffusion models: evidence accumulates deterministically (without within-trial noise), with variability arising only from start points and drift rates across trials. Relevant to LD because ACT-R's cue-based retrieval mechanism can be situated as a lognormal race within this framework [@rouder2015lognormal]. Provides a simpler architecture that can still capture the major RT distribution phenomena in LD.

### The Lognormal Race {#sec-lognormalrace}

**Citation:** @rouder2015lognormal

- **Human DV:** Choice RT distributions.
- **LM output:** Parameters of competing lognormal accumulators: means and variances of accumulation time for each response channel.
- **Key findings:** Develops the lognormal race as a process model of choice with desirable psychometric properties (closed-form likelihood, natural handling of individual differences). In LD, the "word" and "nonword" accumulators race, and the winner determines the response. Connects to ACT-R's retrieval mechanism and provides an alternative to DDM for modeling LD. Co-authored by Pablo Gomez, who also contributed to the DDM application to LD [@ratcliff2004diffusion].

## Individual Differences {#sec-indiv}

**Citation:** @yap2012individual

- **Dataset:** ELP (~4 million trials, 1,200+ participants).
- **Human DV:** LD RT, accuracy, ex-Gaussian parameters, diffusion model parameters.
- **Key findings:** Higher vocabulary knowledge → faster word recognition, attenuated sensitivity to lexical variables (smaller frequency effects), steeper drift rates. Individual differences modulate all model predictions.


# Information-Theoretic Approaches to Lexical Decision {#sec-surprisal}

A large literature links surprisal to processing cost during sentence reading (self-paced reading, eye-tracking). That literature---including foundational work by Smith & Levy (2013) on the logarithmic surprisal effect, cross-linguistic validation by Wilcox et al. (2023), large-scale evidence by Shain et al. (2024), and the inverse scaling phenomenon documented by Oh & Schuler (2023)---is covered in a separate survey on reading time prediction. Here we include only the work that applies information-theoretic measures specifically to lexical decision paradigms.

## Cumulative Surprisal in Auditory LD {#sec-audsurprisal}

**Citation:** @balling2012surprisal

- **Dataset:** Two auditory LD experiments + one visual LD experiment in Danish.
- **Human DV:** Auditory and visual LD latencies.
- **LM output:** Cumulative surprisal (phoneme-by-phoneme probability updates); Kullback--Leibler divergence; uniqueness points (UP1, CUP).
- **Evaluation:** Mixed-effects regression; GAMMs with tensor product smooths.
- **Key findings:** Cumulative surprisal co-determines auditory LD response latencies. Large surprisal at uniqueness points predicts longer latencies. This is the clearest demonstration that information-theoretic measures matter for *lexical decision* specifically (not just sentence reading), particularly in the auditory modality where the signal unfolds over time and phoneme-level surprisal captures the progressive narrowing of the lexical cohort.


# Modern Neural LM and Tokenization Approaches {#sec-neural}

## Cognitive Plausibility of Subword Tokenization {#sec-tokenization}

**Citation:** @beinborn2023tokenization

- **Dataset:** ELP, BLP, DLP, FLP, SPALEX, and datasets for 15 languages total.
- **Paradigm:** Visual LD.
- **Human DV:** LD RT and accuracy (words and nonwords).
- **LM input:** Isolated words/nonwords processed by tokenizer algorithms.
- **LM output:** Number of subword tokens produced; "chunkability" metric (normalized token count).
- **Evaluation:** Pearson/Spearman correlations between token count and RT/accuracy across four conditions.
- **LMs tested:** BPE (GPT-2), WordPiece (BERT), UnigramLM (XLNet/T5) at vocabulary sizes 1K--100K.
- **Key findings:** More tokens = slower RT and lower accuracy for words; opposite for nonwords. BPE and WordPiece are more cognitively plausible than UnigramLM. Effects consistent across 15 languages. The most directly relevant NLP-venue paper linking LM-derived features to LD behavior.

## GPT-FAM {#sec-gptfam}

**Citation:** @brysbaert2025gptfam

- **Dataset:** ELP, BLP, ECP; >400,000 English words.
- **Human DV:** LD RT, naming RT, accuracy.
- **LM input:** Isolated words prompted to GPT-4 to rate familiarity (1--7 scale).
- **LM output:** GPT-4-generated word familiarity (GPT-FAM).
- **Evaluation:** Spearman correlation with LD RT/accuracy; comparison with traditional frequency.
- **LMs tested:** GPT-4 (via ChatGPT API).
- **Key findings:** GPT-FAM outperforms the best available frequency measures in predicting LD and naming. Captures aspects of word prevalence, AoA, and semantic richness in a single measure.

## Simulating Lexical Decision Times with LLMs {#sec-simulating}

**Citation:** @brysbaert2025simulating

- **Dataset:** ELP (fine-tuned on ~3,000 words); ECP.
- **Human DV:** LD RT (zRT).
- **LM input:** Word strings + few-shot fine-tuning examples (word → RT pairs).
- **LM output:** Directly generated RT estimates.
- **LMs tested:** GPT-4o mini (fine-tuned).
- **Key findings:** After fine-tuning on ~3,000 words, GPT-4o mini generates LD RT estimates highly correlated with observed RTs. Four applications: filling missing data, validating virtual experiments, predicting RTs for new words, replicating known effects. The model's importance ordering (frequency > length > concreteness) matches known psycholinguistic patterns.

## LLM-Augmented Psycholinguistic Datasets {#sec-augmented}

**Citation:** @trott2024augment

- **Dataset:** Multiple psycholinguistic datasets including ELP; >30,000 GPT-4 judgments.
- **Human DV:** Various norms used as LD RT predictors.
- **LM input:** Isolated words with instructions to rate concreteness, valence, arousal, familiarity, etc.
- **LM output:** GPT-4-generated psycholinguistic norm ratings.
- **LMs tested:** GPT-4.
- **Key findings:** LLM-generated norms can substitute for human norms in predicting LD performance with minimal loss. Opens path to scaling norm collection to full lexicons.

## Embeddings and Primed LD {#sec-primeld}

**Citation:** @auguste2017embeddings

- **Dataset:** Semantic Priming Project [SPP; @hutchison2013spp].
- **Human DV:** Primed LD RT.
- **LM input:** Word pairs (prime, target).
- **LM output:** Cosine similarity between embedding vectors.
- **Evaluation:** Spearman correlation between cosine similarity and priming RT.
- **LMs tested:** GloVe (6B, 42B, 840B), Word2Vec (Google News, custom BNC, Wikipedia, OpenSubtitles).
- **Key findings:** GloVe embeddings produce significantly higher correlations with primed LD RTs than Word2Vec. Algorithm choice matters more than corpus choice.

# Semantic Priming Predicted by Distributional/LM Models {#sec-priming}

## Semantic Priming Project (SPP) {#sec-spp}

**Citation:** @hutchison2013spp

- **Dataset:** SPP; 6,641 prime-target pairs; 768 participants; two SOAs (200ms, 1200ms).
- **Human DV:** Speeded naming RT, primed LD RT.
- **Key findings:** Foundational megastudy for testing distributional models against priming data.

## BEAGLE and Priming {#sec-beagle}

**Citation:** @jones2006beagle

- **Human DV:** Priming effects (RT differences).
- **LMs tested:** BEAGLE, LSA, HAL.
- **Key findings:** BEAGLE, encoding both context and word-order information, best accounts for semantic-only, associative-only, and mediated priming.

## LSA Cosines Predict Priming {#sec-lsapriming}

**Citation:** @guenther2016lsa

- **Human DV:** LD RT in priming experiment.
- **LM output:** LSA cosine similarity (directly manipulated as IV).
- **Key findings:** First study to directly manipulate DSM cosines as an independent variable in priming. Higher cosine = shorter RT.


# EEG/N400 and Word Recognition with LMs {#sec-eeg}

## LM Surprisal Explains N400 {#sec-n400}

**Citation:** @michaelov2024n400

- **Human DV:** N400 amplitude.
- **LM output:** GPT-3 surprisal; GloVe and fastText cosine similarity.
- **LMs tested:** GPT-3 (davinci), GloVe, fastText.
- **Key findings:** GPT-3 surprisal is the best predictor of N400 amplitude, outperforming cosine similarity. Supports strong prediction account of N400.


# Reviews and Overviews {#sec-reviews}

## Megastudies Overview {#sec-megaoverview}

**Citation:** @keuleers2015megastudies

- **Key findings:** Reviews the megastudy approach and how ELP/BLP/DLP/FLP have been used to test computational models and identify new psycholinguistic variables.

## Vector-Space Models from Cognitive Perspective {#sec-vsmreview}

**Citation:** @guenther2019review

- **Key findings:** Major review of distributional semantic models (LSA, HAL, BEAGLE, GloVe, word2vec) from a psychological perspective. Discusses their validation through predicting LD times and priming effects.


# Cross-Cutting Synthesis {#sec-synthesis}

The literature reveals a clear hierarchy of predictive power and several critical methodological insights.

## Variance Explained by Predictor Type

Approximate values from ELP LD data:

| Predictor class | Key measure | Unique $R^2$ contribution | Key reference |
|:---|:---|:---|:---|
| Word frequency / CD | SUBTLEX-US log CD | ~30--40% | @brysbaert2009subtlexus |
| Orthographic form | OLD20, word length | ~5--10% | @yarkoni2008old20 |
| Semantic density | word2vec SND | ~2--5% additional | @mandera2017explaining |
| Semantic richness | NoF, NOS, BOI, SER | ~1--3% additional | @pexman2008richness |
| Word prevalence | % pop. knowing word | ~5--10% additional | @keuleers2015prevalence |
| Age of acquisition | AoA ratings | ~2--4% additional | @kuperman2012aoa |
| Tokenization features | BPE/WordPiece token count | significant $r$ with RT | @beinborn2023tokenization |
| LLM familiarity | GPT-4 FAM rating | exceeds traditional freq | @brysbaert2025gptfam |
| NDL/DLM measures | G2L prior, semantic support | outperform freq + N | @milin2017discrimination |
| Full model (best) | CBOW + all covariates | ~45.5% | @mandera2017explaining |

The best single model reported in the literature for predicting ELP LD RT is @mandera2017explaining's CBOW word2vec model combined with standard lexical covariates, at 45.5% variance explained. Frequency alone accounts for 30--40%, and the remaining 5--15% comes from orthographic, semantic, and other variables.

## Process Models and the Decision Stage

A critical dimension often overlooked in predictor-oriented surveys is the *decision mechanism* by which perceptual evidence is converted into a word/nonword response. The survey covers several families of process models:

- **Interactive activation models** generate LD predictions via activation thresholds: the MROM [@grainger1996mrom] provides the most explicit LD mechanism (dual read-out criteria for familiarity and identification), while the DRC [@coltheart2001drc] derives LD from lexical route activation.
- **Connectionist models** generate LD predictions via error/stress signals: the PDP triangle model [@seidenberg1989pdp] and its semantic extension [@harm2004triangle] frame LD as a familiarity judgment based on how well the input settles into a learned attractor.
- **Evidence accumulation models** decompose RT distributions into process components: the drift-diffusion model [@ratcliff1978ddm; @ratcliff2004diffusion], the Bayesian Reader [@norris2006bayesian; @norris2009unified], the REM-LD model [@wagenmakers2004remld], and the lognormal race [@rouder2015lognormal] all model LD as a noisy accumulation-to-threshold process where word frequency primarily determines the quality of evidence (drift rate).

These models matter for the Gym because they specify different linking functions between any predictor (frequency, SND, etc.) and the observed RT. A user submitting a "model" to the Gym might submit not just a set of predictor values but a process model that maps those values through a specific decision architecture.

## Critical Methodological Observations

Three critical methodological observations emerge from this literature.

First, **contextual diversity consistently outperforms raw frequency** [@adelman2006cd; @brysbaert2009subtlexus], meaning that the number of distinct contexts in which a word appears matters more than total exposure count.

Second, **internal noise in LD is substantial**---@diependaele2012noise showed only 83--91% of responses are consistent, setting a ceiling on explainable variance at roughly 60--70% (confirmed by @brysbaert2025simulating's fine-tuned GPT-4o mini).

Third, **the choice of corpus matters enormously**: subtitle-based frequencies outperform written-text frequencies across every language tested, and social media frequencies may outperform even subtitles [@herdagdelen2017social].

## The Emerging LLM Paradigm

The emerging LLM paradigm represents a fundamental shift. Rather than extracting specific features (frequency, SND, surprisal) from models, recent work by @brysbaert2025gptfam, @brysbaert2025simulating, and @trott2024augment demonstrates that LLMs can directly generate psycholinguistic norms and even LD RTs themselves. Fine-tuned GPT-4o mini generates RTs that are highly correlated with observed values, and GPT-4-generated familiarity ratings outperform decades-old frequency norms. This suggests that modern LLMs have internalized the distributional regularities that drive word recognition, not as explicit frequency counts but as implicit knowledge captured during pretraining. Whether this constitutes a genuine model of word recognition or merely reflects sophisticated pattern matching on training data that includes psycholinguistic research remains an open and important question.

## The Lexical Decision--Reading Time Distinction

The lexical decision--reading time distinction is crucial for interpreting this literature. A large body of NLP-venue work on surprisal and transformer models uses reading times in sentence context, where contextual surprisal is the linking variable; that work is covered in a companion survey on reading time prediction. Isolated-word LD involves different processes: without a sentence context, unigram surprisal (≈ log frequency) and word-form properties dominate, and contextual surprisal is undefined. The few papers bridging this gap---@beinborn2023tokenization on tokenization, @mandera2017explaining on embeddings, @brysbaert2025gptfam and @brysbaert2025simulating on LLM-generated measures---represent the most direct intersection of modern NLP and LD megastudy research.

# Taxonomy of Model Types by Input and Output {#sec-taxonomy}

This section organizes all predictor-generating models encountered in the survey by what they take as input and what they produce as output. The goal is to enumerate the distinct *interface types* that the Psycholinguistics Gym would need to support. Each type defines a contract: "given input of kind X, produce output of kind Y." A user submitting a model to the Gym would implement one or more of these interfaces, and the Gym would evaluate the resulting predictions against human data.

We distinguish twelve types, grouped into four broad families.

## Family A: Word-intrinsic and lexicon-derived features {#sec-familyA}

These are the simplest class of predictors: deterministic properties that can be computed from the word string alone, or from the word string plus a reference lexicon or corpus, with no learned parameters. A researcher can compute these in a few lines of code given only the stimulus list and standard resources. They require no "model" in the machine learning sense---no training, no optimization, no learned weights. Despite their simplicity, these features collectively account for the largest share of explainable variance in LD RT (~35--45%), and they serve as the mandatory baseline that any more sophisticated model must improve upon. Every paper in this survey controls for at least word frequency (Type 2) and word length (Type 0) before testing a new predictor.

### Type 0: Intrinsic word properties {#sec-type0}

- **Input:** A word string (or character sequence).
- **Output:** Deterministic properties of the orthographic/phonological form: letter count, syllable count, morpheme count, stroke count (Chinese), number of characters.
- **Papers:** Used as covariates in virtually every study. @new2006wordlength showed the U-shaped length effect in ELP.
- **Gym interface:** `word_string → {length, n_syllables, n_morphemes, ...}`. No model to submit; the Gym computes these as baselines and standard covariates.

### Type 1: Orthographic and phonological neighborhood statistics {#sec-type1}

- **Input:** A word string + a reference lexicon (list of all known words in the language).
- **Output:** Coltheart's N (substitution neighbors), OLD20 (mean Levenshtein distance to 20 closest neighbors), phonological neighborhood density (PND), bigram/trigram frequency, phonotactic probability.
- **Papers:** @coltheart1977access introduced N; @yarkoni2008old20 introduced OLD20 as a superior replacement; @tucker2019mald used phonological ND for auditory LD.
- **Gym interface:** `word_string × lexicon → {N, OLD20, PND, ...}`. The Gym could provide a standard lexicon per language; users could also submit custom neighborhood metrics computed from their own lexicons.

### Type 2: Corpus-derived frequency and diversity statistics {#sec-type2}

- **Input:** A word string + a large text corpus (or its pre-computed frequency tables).
- **Output:** A scalar per word: raw frequency, log frequency, contextual diversity (proportion of documents containing the word), rank frequency.
- **Subtypes by corpus source:**
    - *Traditional print corpora:* Kučera--Francis, CELEX, BNC, HAL [@balota2007elp].
    - *Subtitle corpora:* SUBTLEX-US [@brysbaert2009subtlexus], SUBTLEX-NL [@keuleers2010subtlexnl], SUBTLEX-UK, SUBTLEX-DE [@brysbaert2011german], SUBTLEX-CH. Currently the gold standard for most languages.
    - *Social media corpora:* Facebook, Twitter/Worldlex frequencies [@herdagdelen2017social; @ferrand2018megalex].
    - *Contextual diversity variants:* Adelman-style document proportion [@adelman2006cd]; semantic distinctiveness that weights unique vs. redundant contexts [@johns2022distinctiveness].
    - *Rank frequency:* Ordinal position in frequency-sorted list [@murray2004rank].
- **Papers:** @brysbaert2018review provides the comprehensive review; @adelman2006cd showed CD subsumes frequency.
- **Gym interface:** `word_string × corpus → {log_freq, CD, rank, ...}`. Users could submit predictions from any corpus. The Gym would provide standard frequency norms (SUBTLEX-US, etc.) as baselines. The key design question: does the Gym accept pre-computed frequency tables, or does it require the user to specify a corpus and extraction method?

## Family B: Human-normed and LLM-generated psycholinguistic variables {#sec-familyB}

These are per-word scalar ratings that capture psychological or experiential properties of words---properties that cannot be computed from the word string or a corpus alone, but instead reflect how humans *experience* or *know* those words. Traditionally, these are collected by asking human participants to rate words on scales (e.g., "How old were you when you learned this word?" for AoA, or "How concrete is this word?" for concreteness). Because human norming is expensive and slow, these ratings typically exist for only a few thousand to a few tens of thousands of words, and they are provided as fixed lookup tables rather than as generative models.

A recent development is the use of large language models (LLMs) to *simulate* human norming at scale (Types 5a--5b). LLMs prompted to rate word familiarity or concreteness produce norms that correlate highly with human norms and, in some cases, predict LD RT better than the human norms themselves. At the extreme end, fine-tuned LLMs can directly output predicted RTs, collapsing the entire predictor → linking function → RT pipeline into a single black-box model.

For the Gym, Family B predictors are distinguished from Family A by the fact that their values cannot be recomputed from the stimulus list alone---they must be *supplied* by the user (or by the Gym's norm database) as fixed tables.

### Type 3: Human-collected psycholinguistic norms {#sec-type3}

- **Input:** A word string → human raters (or a lookup table of previously collected norms).
- **Output:** A scalar rating per word: age of acquisition (AoA), concreteness, imageability, valence, arousal, familiarity, body-object interaction (BOI), sensory experience ratings (SER), number of features (NoF), number of senses (NOS).
- **Papers:** @kuperman2012aoa (AoA); @kuperman2014emotion (valence/arousal); @pexman2008richness (NoF, NOS, CD as semantic richness).
- **Gym interface:** `word_string → {aoa, concreteness, valence, ...}`. Users submit a vector of norm values per word. The Gym provides standard norm sets as baselines.

### Type 4: Word prevalence {#sec-type4}

- **Input:** A word string → large-scale vocabulary test (or its results).
- **Output:** Proportion of the population that knows the word.
- **Papers:** @keuleers2015prevalence; @brysbaert2016dlp2.
- **Gym interface:** `word_string → prevalence_score`. This is a distinct predictor type because it captures a population-level property (what fraction of people know this word) rather than a property of the word itself or its corpus distribution.

### Type 5: LLM-generated norms and simulated RTs {#sec-type5}

- **Input:** A word string + a prompt template → LLM API.
- **Output:** Either (a) LLM-generated psycholinguistic norm ratings (familiarity, concreteness, etc.) or (b) directly generated RT estimates.
- **Papers:** @brysbaert2025gptfam (GPT-FAM: GPT-4 familiarity ratings); @trott2024augment (GPT-4 norm ratings for 30+ variables); @brysbaert2025simulating (fine-tuned GPT-4o mini generating LD RTs directly).
- **LMs:** GPT-4, GPT-4o mini (fine-tuned).
- **Gym interface:** Two sub-interfaces:
    - *Norm generation:* `word_string × prompt → norm_rating`. Same output format as Type 3, but the source is an LLM rather than human raters.
    - *Direct RT prediction:* `word_string → predicted_RT`. The LLM directly outputs a predicted reaction time. This is a fundamentally different interface because it bypasses the predictor → linking function → RT pipeline entirely---the LLM *is* the full model.

## Family C: Trained representation models {#sec-familyC}

These are models in the machine learning sense: they have internal parameters (weights, embeddings, vocabulary tables) that have been *learned* from a corpus of text or from form-meaning mappings. Given a word string as input, they produce a structured representation---a dense vector, a probability distribution, an activation pattern, or a set of derived scalar features---that encodes what the model has learned about that word from its training data. Unlike Family A's deterministic computations or Family B's fixed lookup tables, these models transform the input through learned parameters, and different training corpora, architectures, or hyperparameters will produce different representations for the same word.

The key distinction from Family D (below) is that Family C models produce *representations or features*, not *behavioral predictions*. A Family C model outputs something like "the embedding vector for *cat* is [0.23, -0.41, ...]" or "the tokenizer segments *unhappiness* into [un, happi, ness]"---it is then the Gym's evaluation pipeline (or the user's separate linking function) that converts these representations into predicted RTs. In other words, Family C models answer "what does the model represent about this word?" while Family D models answer "how does the system make a word/nonword decision?"

This family spans a wide range of complexity, from simple embedding lookups (Type 6) to full autoregressive language models (Type 11). They are ordered roughly by the richness of the input they require and the complexity of their internal computation.

### Type 6: Static word embedding models {#sec-type6}

- **Input:** A word string → embedding lookup (from a pretrained embedding matrix).
- **Output:** A dense word vector (typically 100--300 dimensions). Derived scalar measures: semantic neighborhood density (SND = mean cosine to $k$ nearest neighbors), average radius of co-occurrence (ARC), cosine similarity between word pairs (for priming).
- **Models:** Word2Vec CBOW, Word2Vec Skip-gram, GloVe, fastText, LSA, HAL, HiDEx, BEAGLE, PPMI-SVD, subs2vec.
- **Papers:** @mandera2017explaining is the most comprehensive comparison; @shaoul2010hidex (HiDEx/SND); @vanparidon2021subs2vec (subs2vec in 55 languages); @sassenhagen2020traces (fastText for ERP encoding).
- **Key property:** One vector per word type, no context sensitivity. fastText uniquely allows vectors for nonwords via subword n-gram composition [@hendrix2021nonword].
- **Gym interface:** `word_string → vector` (the embedding itself) plus `vector → {SND, ARC, ...}` (derived scalars). Users submit either pre-computed vectors or a model that generates them. The Gym computes standard derived measures. For priming datasets: `(prime_string, target_string) → cosine_similarity`.

### Type 7: Word association / network models {#sec-type7}

- **Input:** A word string → association graph lookup (e.g., SWOW-EN).
- **Output:** Associative strength to other words, spreading activation measures, graph-theoretic centrality.
- **Papers:** @dedeyne2019swow; @jones2006beagle (BEAGLE captures associative structure).
- **Gym interface:** `word_string → {assoc_strength, centrality, ...}`. Structurally similar to Type 6 but the underlying representation is a graph rather than a vector space.

### Type 8: Tokenization-derived features {#sec-type8}

- **Input:** A word string → tokenizer algorithm.
- **Output:** Number of subword tokens, token boundary positions, token frequency, chunkability (normalized token count), alignment with morpheme boundaries.
- **Models:** BPE (GPT-2 tokenizer), WordPiece (BERT tokenizer), UnigramLM (XLNet/T5 tokenizer), at various vocabulary sizes.
- **Papers:** @beinborn2023tokenization.
- **Gym interface:** `word_string × tokenizer → {n_tokens, token_boundaries, chunkability, ...}`. Users submit a tokenizer (or its vocabulary file) and the Gym runs it on the stimulus set. This is a lightweight interface that doesn't require a full LM.

### Type 9: Compositional distributional models (morphology) {#sec-type9}

- **Input:** A morphologically complex word → decomposed into stem + affix (or modifier + head) → composition function applied to component vectors.
- **Output:** A composed vector for the derived/compound word; semantic transparency = cosine between composed vector and observed whole-word vector.
- **Models:** FRACSS [@marelli2015fracss] for derived words; CAOSS [@guenther2019compound] for compounds.
- **Papers:** @kim2019compound; @guenther2020german.
- **Gym interface:** `(stem_vector, affix) → composed_vector; cosine(composed, observed) → transparency_score`. Requires the user to provide both the composition function and the base embedding space. Inherits from Type 6.

### Type 10: Discrimination-based models {#sec-type10}

- **Input:** A word's orthographic form encoded as letter n-gram cues (or triphone cues for auditory) → linear mapping to semantic space.
- **Output:** Discrimination-based measures: G2L prior (how strongly the cues predict this word), G2L activation diversity, L2L prior, L2L I-diversity, semantic support (correlation between predicted and target semantic vector), path certainty, uncertainty.
- **Models:** Naive Discriminative Learning (NDL) via Rescorla--Wagner equilibrium equations; Linear Discriminative Learning (LDL) / Discriminative Lexicon Model (DLM) via Widrow--Hoff learning.
- **Papers:** @baayen2011ndl; @milin2017discrimination; @baayen2019dlm; @chuang2021ldl; @heitmeier2023trial; @heitmeier2024frequency.
- **Key property:** These models derive frequency effects, morphological effects, and semantic effects as *emergent consequences* of error-driven learning, rather than treating them as separate predictors. They also naturally handle nonwords (which receive predicted semantic vectors that can be evaluated for plausibility).
- **Gym interface:** `word_string → {G2L_prior, activation_diversity, semantic_support, ...}`. The user must specify the training corpus, the cue structure (e.g., letter trigrams), and the semantic target space (e.g., fastText vectors). This is a more complex interface because the model has internal parameters learned from a corpus, unlike the simple lookup of Types 0--4.

### Type 11: Contextual language models (surprisal) {#sec-type11}

- **Input:** A word *in sentence context* → language model.
- **Output:** Conditional probability $P(w|\text{context})$; surprisal $s(w) = -\log P(w|\text{context})$; contextual entropy $H(\text{context})$; contextual word embeddings (hidden states).
- **Subtypes:**
    - *N-gram models:* trigram, 5-gram, Kneser--Ney smoothed.
    - *RNN/LSTM models:* recurrent neural network language models.
    - *Transformer models:* GPT-2 (small through XL), GPT-Neo, OPT, mGPT, and other autoregressive LMs.
- **Papers (applied to LD):** @balling2012surprisal used cumulative phoneme surprisal for auditory LD. Most other surprisal work targets reading times in sentence context and is covered in a companion survey.
- **Scope note:** Contextual surprisal is largely *not applicable* to standard isolated-word LD paradigms, because there is no preceding sentence context. However, it becomes relevant for (a) auditory LD with cumulative phoneme-level surprisal [@balling2012surprisal], and (b) any future LD-in-context paradigms. The Gym should support this interface but flag that it applies to a restricted set of LD datasets.
- **Gym interface:** `(context, word) → {surprisal, entropy, hidden_state}`. For isolated-word LD, context is null and only unigram surprisal (≈ log frequency) is defined.

## Family D: Process and decision models {#sec-familyD}

Families A--C produce *predictor values*---numbers that correlate with RT and can be plugged into a regression. Family D is qualitatively different. A process model (also called a "cognitive model" or "computational model of the task") specifies the *mechanism* by which the cognitive system transforms perceptual input into a behavioral response. Rather than saying "words with higher frequency have shorter RTs," a process model says "perceptual evidence for this word accumulates at rate $v$ (determined by its frequency) in a noisy random walk toward a decision boundary at distance $a$, and the RT is the first-passage time of this process plus a nondecision component $T_{er}$."

The crucial property of process models is that they generate not a single predicted mean RT, but a *full RT distribution* (and accuracy) for each item. This means they can be evaluated on much richer data: not just "does this predictor correlate with mean RT?" but "does this model correctly predict the shape of the RT distribution, the speed--accuracy tradeoff, and the pattern of errors?" Process models can also decompose observed effects into mechanistically distinct sources---for example, word frequency might affect the quality of evidence (drift rate) while nonword type affects response caution (boundary separation), even though both manifest as RT differences.

For the Gym, supporting Family D models means accepting submissions that include: (1) a *linking function* mapping predictor values from Families A--C to process model parameters (e.g., log frequency → drift rate), and (2) a *decision architecture* (DDM, LBA, Bayesian Reader, etc.) that generates predicted RT distributions from those parameters. The evaluation pipeline must then compare predicted distributions to observed distributions, not just predicted means to observed means. This is more computationally intensive but provides a much more informative test of theory.

### Type 12: Evidence accumulation / decision models {#sec-type12}

- **Input:** An evidence quality signal per word (e.g., drift rate derived from frequency, or activation level from an interactive activation network) + decision parameters (boundary, starting point, nondecision time).
- **Output:** Predicted RT distribution (not just mean RT) and accuracy for both word and nonword responses.
- **Models:**
    - *Drift-diffusion model (DDM):* Evidence accumulates as a noisy random walk toward word or nonword boundary [@ratcliff1978ddm; @ratcliff2004diffusion].
    - *Bayesian Reader / SPRT:* Posterior probability updated over perceptual samples; response when posterior exceeds criterion [@norris2006bayesian; @norris2009unified].
    - *REM-LD:* Log-likelihood ratio from global memory matching drives a random walk [@wagenmakers2004remld].
    - *Linear ballistic accumulator (LBA):* Deterministic accumulation with across-trial variability [@heathcote2012lba].
    - *Lognormal race:* Competing lognormal accumulators for word and nonword responses [@rouder2015lognormal].
    - *Interactive activation models (MROM, DRC):* Activation builds in a network until read-out criteria are met [@grainger1996mrom; @coltheart2001drc].
    - *Connectionist models (PDP/triangle):* Network settles into attractor; LD via stress/error signal [@seidenberg1989pdp; @harm2004triangle].
- **Gym interface:** This is the most complex interface. The user submits:
    1. A *linking function* that maps word-level predictor(s) to a model parameter (e.g., SUBTLEX frequency → drift rate).
    2. The *decision architecture* (DDM, LBA, etc.) with its parameters.
    3. The Gym evaluates the predicted RT distribution against the observed distribution, not just the mean.
- **Evaluation may use:** Quantile fits (.1--.9), Kolmogorov--Smirnov distance, or likelihood of observed data given the model's predictions.


# Catalog of Human Dependent Variables {#sec-humandv}

This section enumerates every human DV encountered in the surveyed literature. These are the targets that submitted models must predict. For the Gym's purposes, we organize them by measurement type, aggregation level, and which datasets provide them.

## Primary DVs: Lexical decision reaction time {#sec-primarydv}

The core DV across the entire literature. Several variants exist, and the Gym must support all of them because they are not interchangeable.

### Item-level mean RT {#sec-meanrt}

- **Description:** For each word (or nonword), the arithmetic mean of all participants' correct-response RTs, typically after trimming outliers (e.g., $\pm 2.5$ SD, or absolute cutoffs like 200--3000 ms). Reported in milliseconds.
- **Datasets providing this:** ELP, BLP, DLP1, DLP2, FLP, MEGALEX, MELD-SCH, CLP, SPALEX, ICP, ECP, MALD.
- **Used in:** The vast majority of papers as the primary DV for regression analyses.
- **Gym interface:** The Gym provides a vector of mean RTs (one per item); the submitted model provides a vector of predicted values (or predicted predictor values); evaluation is via $R^2$, $\Delta R^2$, or correlation.

### Item-level z-scored RT (zRT) {#sec-zrt}

- **Description:** Each participant's RTs are z-scored within-participant (subtracting their mean, dividing by their SD), then averaged per item. This removes participant-level speed differences, yielding a purer measure of item difficulty.
- **Datasets providing this:** ELP (I_Zscore), BLP, DLP2.
- **Advantages:** More sensitive to item-level effects; recommended by @balota2007elp for cross-study comparisons.
- **Gym interface:** Same as mean RT. The Gym should offer both raw RT and zRT as evaluation targets.

### Trial-level RT {#sec-trialrt}

- **Description:** Individual trial-level RTs (one observation per participant × item), not aggregated across participants. Used in mixed-effects models and survival analyses.
- **Datasets providing this:** ELP (full trial data available), BLP, DLP1.
- **Papers:** @hendrix2021nonword used trial-level BLP data in piecewise additive mixed models (PAMMs); @heitmeier2023trial modeled trial-by-trial learning.
- **Gym interface:** The submitted model provides a predicted RT (or hazard rate) for each trial, potentially conditioned on participant-level random effects. Evaluation via mixed-effects model likelihood, or PAMM log-likelihood.

### RT distribution quantiles {#sec-quantiles}

- **Description:** The .1, .3, .5, .7, .9 quantiles of the RT distribution for each condition (or item), computed from correct responses. These capture the *shape* of the distribution, not just its central tendency.
- **Datasets providing this:** Any dataset with sufficient trial counts per condition (ELP conditions, experimental LD studies).
- **Papers:** @ratcliff2004diffusion; @norris2009unified; @wagenmakers2004remld.
- **Gym interface:** The submitted model (typically a Type 12 process model) generates predicted quantiles; evaluation via $\chi^2$ fit across quantile bins, or quantile regression.

### Ex-Gaussian parameters {#sec-exgaussian}

- **Description:** The RT distribution is decomposed into $\mu$ (Gaussian mean), $\sigma$ (Gaussian SD), and $\tau$ (exponential tail). Frequency effects primarily modulate $\tau$ (the slow tail), not $\mu$.
- **Papers:** @yap2012individual.
- **Gym interface:** Submitted model predicts $(\mu, \sigma, \tau)$ per condition or per item.

### Diffusion model parameters {#sec-diffparams}

- **Description:** Parameters extracted by fitting the drift-diffusion model to RT distributions: drift rate $v$, boundary separation $a$, nondecision time $T_{er}$, starting point $z$, and variability parameters ($s_v$, $s_z$, $s_t$).
- **Papers:** @ratcliff2004diffusion; @yap2012individual.
- **Gym interface:** These are *derived* DVs (extracted from raw RTs via DDM fitting). The Gym could provide pre-extracted DDM parameters as an additional evaluation target, or accept submitted process models that predict them.

## Primary DVs: Lexical decision accuracy {#sec-accuracy}

### Item-level accuracy {#sec-itemacc}

- **Description:** Proportion of participants responding correctly (word → "yes", nonword → "no") for each item.
- **Datasets providing this:** ELP, BLP, DLP1, DLP2, FLP, SPALEX, MELD-SCH, CLP, ICP, ECP, MALD.
- **Papers:** All megastudy papers report accuracy. @beinborn2023tokenization used accuracy as an evaluation target alongside RT.
- **Gym interface:** The submitted model provides predicted accuracy per item; evaluation via correlation or a proper scoring rule (log-loss). Alternatively, the model predicts a probability of "yes" response, evaluated against observed accuracy.

## Secondary DVs: Primed lexical decision {#sec-primeddv}

### Primed LD RT {#sec-primedrt}

- **Description:** RT in a lexical decision task where each target word is preceded by a prime word (or a neutral baseline). The priming effect = RT(unrelated) − RT(related).
- **Datasets providing this:** Semantic Priming Project [SPP; @hutchison2013spp], various experimental studies.
- **Papers:** @mandera2017explaining; @auguste2017embeddings; @guenther2016lsa; @jones2006beagle.
- **Gym interface:** The submitted model provides predicted priming magnitude for each prime--target pair; or predicted RT for each (prime, target, SOA) combination. Evaluation via correlation with observed priming effects.

## Secondary DVs: Auditory lexical decision {#sec-auditorydv}

### Auditory LD RT {#sec-audrt}

- **Description:** RT for deciding whether a spoken stimulus is a real word or a pseudoword. The temporal dynamics differ from visual LD because auditory input unfolds over time.
- **Datasets providing this:** MALD [@tucker2019mald], MEGALEX auditory [@ferrand2018megalex].
- **Papers:** @balling2012surprisal (cumulative phoneme surprisal); @chuang2021ldl (primed auditory LD).
- **Gym interface:** Same structure as visual LD, but the predictor space may include phoneme-level temporal features (uniqueness point, cohort size, cumulative surprisal). Models may need to produce predictions at phoneme-level temporal resolution.

## Secondary DVs: Naming / pronunciation {#sec-namingdv}

### Naming RT {#sec-namingrt}

- **Description:** Time to initiate pronunciation of a visually presented word. Co-collected with LD in many megastudies.
- **Datasets providing this:** ELP (naming subset, 444 participants), MEGALEX.
- **Relevance:** Not a lexical *decision* DV per se, but naming data appear as comparison DVs in many of the surveyed papers (e.g., @balota1984frequency showed frequency effects are smaller in naming than LD). The Gym may want to include naming as a secondary evaluation target to test whether models that predict LD also predict naming, and vice versa.

## Secondary DVs: Neural measures {#sec-neuraldv}

These are recorded during word recognition tasks that overlap with LD paradigms (isolated word reading, single-word presentation).

### ERP amplitudes (N400, P600) {#sec-erpdv}

- **Description:** Voltage amplitude at specific time windows post-stimulus, measured via EEG. The N400 (negative deflection ~400 ms) reflects semantic processing difficulty; the P600 (positive deflection ~600 ms) reflects reanalysis.
- **Papers:** @sassenhagen2020traces (encoding/decoding of fastText vectors during isolated word reading); @michaelov2024n400 (GPT-3 surprisal predicts N400).
- **Gym interface:** The submitted model provides predicted ERP amplitude per item; evaluation via encoding model $R^2$ or correlation. This is a stretch target for the Gym---it would require ERP datasets aligned with the same stimuli.

## Summary: DV × Dataset matrix for the Gym {#sec-dvmatrix}

| DV | Visual LD datasets | Auditory LD datasets | Priming datasets | Neural datasets |
|:---|:---|:---|:---|:---|
| Item-level mean RT | ELP, BLP, DLP1/2, FLP, MEGALEX, MELD-SCH, CLP, SPALEX, ICP, ECP | MALD, MEGALEX-aud | SPP | — |
| z-scored RT | ELP, BLP, DLP2 | — | — | — |
| Accuracy | ELP, BLP, DLP1/2, FLP, SPALEX, MELD-SCH, CLP, ICP, ECP | MALD | SPP | — |
| Trial-level RT | ELP, BLP, DLP1 | MALD | — | — |
| RT quantiles | ELP (conditions) | MALD | — | — |
| Priming magnitude | — | — | SPP | — |
| ERP amplitude | — | — | — | Sassenhagen & Fiebach datasets |

The minimal viable Gym for lexical decision should support **item-level mean RT** and **accuracy** as primary evaluation targets, using ELP as the default English benchmark and BLP/DLP/FLP/MELD-SCH/CLP for cross-linguistic evaluation. Trial-level RT, RT distributions, and priming data represent extensions that enable richer model evaluation (mixed-effects analyses, process model fitting, and generalization to context-dependent recognition).


# References {.unnumbered}

::: {#refs}
:::
